import React, {useEffect, useState, useCallback, useRef} from 'react';
import DeviceInfo from 'react-native-device-info';
import {
  Text,
  View,
  RefreshControl,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  ClassDetailBox,
  CustomFlatList,
  EmptyComponent,
  Header,
  MainLayout,
  ModifiedOTPInput,
} from '../../../components';
import styles from './styles';
import {MyClasses} from '../../../Data/DummyData';
import Routes from '../../../navigation/Routes';
import axiosWrapper from '../../../services/AxiosWrapper';
import {API_URLS} from '../../../services/apiPathList';
import formatDate, {
  checkAttendanceStatus,
  getCurrentDateInFormat,
  shouldDisableButton,
  sortClassesBySemesterAndTime,
  getAttendanceButtonDisabledStates,
} from '../../../utility/FormateDate';
import {setRefreshClassesForStudent} from '../../../redux/Reducers/TempData';
import {UtilityMethods} from '../../../utility';
import AlertService from '../../../services/AlertService';
import {setFcmToken} from '../../../redux/Reducers/AuthReducer';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  let classes = useRef(null);
  const user = useSelector(state => state.auth.user);
  const token = useSelector(state => state.auth.token);
  const fcmToken = useSelector(state => state.auth.fcmToken);
  let refresh = useSelector(state => state.temp.refreshClassesForStudent);

  useEffect(() => {
    setTimeout(async () => {
      UtilityMethods.requestPermission(res => {
        if (res) updateDeviceTokenForNotificaiton(res);
      });
    }, 10);
  }, []);

  const updateDeviceTokenForNotificaiton = async res => {
    let payload = {
      fcmToken: res,
      isInAppNotificationEnabled: true,
      isLogin: true,
    };
    try {
      if (res) {
        let response = await axiosWrapper(
          'PATCH',
          API_URLS.EDIT_PROFILE,
          payload,
          token,
          false,
          'json',
          false,
        );

        dispatch(setFcmToken(res));
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleRefreshClasses = useCallback(() => {
    if (refresh) {
      getInstructorClasses(); // Call the function here
    }
  }, [refresh, getInstructorClasses]);

  useEffect(() => {
    getInstructorClasses();
  }, []);

  useEffect(() => {
    handleRefreshClasses();
  }, [handleRefreshClasses]);

  const getInstructorClasses = async (isRefresh = true) => {
    if (isRefresh) setLoader(true);
    classes.current = [];

    try {
      // Fetch the list of classes
      let response = await axiosWrapper(
        'GET',
        `${API_URLS.GET_CLASSES}?date=${getCurrentDateInFormat()}`,
        null,
        token,
        false,
        'json',
        false,
      );
      classes.current = response.data;
      console.log(
        'URLL',
        `${API_URLS.GET_CLASSES}?date=${getCurrentDateInFormat()}`,
      );

      if (!classes.current || classes.current.length === 0) {
        classes.current = [];
        return;
      }
      console.log('CLASS', classes);

      classes.current = sortClassesBySemesterAndTime(classes.current);
      // Process each class based on shouldDisableButton logic
      const classesWithAttendanceStatus = await Promise.all(
        classes.current.map(async classItem => {
          console.log('classItem', classItem);
          if (!shouldDisableButton(classItem)) {
            try {
              let data = {
                classID: classItem?._id,
                classScheduleID: classItem?.schedule?._id,
              };

              const attendanceResponse = await axiosWrapper(
                'POST',
                API_URLS.CLASS_ATTENDANCE_STATUS,
                data,
                token,
                false,
                'json',
                false,
              );

              const status = checkAttendanceStatus(
                attendanceResponse,
                user?.role,
                user?._id,
              );

              // Add the attendance status to the class object
              return {
                ...classItem,
                attendanceStatus: attendanceResponse,
                showButtonDisabled: status.showButtonDisabled,
                alertMessage: status.message,
              };
            } catch (error) {
              return {
                ...classItem,
                attendanceStatus: null,
                showButtonDisabled: true,
              }; // Handle error
            }
          } else {
            // No API call, return class as is
            return {
              ...classItem,
              attendanceStatus: null,
              showButtonDisabled: false,
              alertMessage: 'Class not available. Please check the schedule.',
            };
          }
        }),
      );

      // Set the state with the classes that now include attendance status
      classes.current = classesWithAttendanceStatus;
    } catch (error) {
      console.error('Error fetching classes', error);
    } finally {
      dispatch(setRefreshClassesForStudent(false));
      setLoader(false);
      setRefreshing(false);
    }
  };

  const handleAttendance = async selectedItem => {
    // console.log('@@@@ Handle Attendance Items', JSON.stringify(selectedItem));
    // if (item?.alertMessage) {
    //   Alert.alert('Alert', item?.alertMessage);
    //   return;
    // }

    // setCheckOTPGenerated(true);
    // setRefreshing(true);
    await getInstructorClasses();
    // setCheckOTPGenerated(false);

    // console.log(`@@@@@ ${JSON.stringify(classes.current)}`);

    const item = classes.current?.find(
      classObj => classObj._id === selectedItem._id,
    );

    if (item?.alertMessage) {
      Alert.alert('Alert', item?.alertMessage);
      return;
    } else {
      navigation.navigate(Routes.ATTENDANCE, {item});
    }

    // navigation.navigate(Routes.ATTENDANCE, {item});
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getInstructorClasses();
  }, []);

  // Add this state to store disabled states
  const [attendanceButtonDisabledStates, setAttendanceButtonDisabledStates] =
    useState([]);

  useEffect(() => {
    // Update disabled states whenever classes.current changes
    if (classes.current && Array.isArray(classes.current)) {
      setAttendanceButtonDisabledStates(
        getAttendanceButtonDisabledStates(classes.current),
      );
    }
  }, [classes.current]);

  return (
    <MainLayout loader={loader}>
      <View style={styles.cont}>
        <Header
          title="Home"
          showBackButton={false}
          DrawerHeader={true}
          isHomeScreen={true}
          onRefreshHomeScreen={onRefresh}
        />
        <CustomFlatList
          listStyle={styles.listStyle}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={() =>
            !loader && (
              <EmptyComponent
                title={'No Classes Found!'}
                desc={
                  'Sorry we cannot find any registered classes for you. Please contact your instructor to add you to their class lists.'
                }
              />
            )
          }
          ListHeaderComponent={
            <View style={styles.headerCont}>
              <Text style={styles.headerText}>My Classes</Text>
              <Text style={styles.regText}>for {formatDate(new Date())}</Text>
            </View>
          }
          data={classes.current}
          keyExtractor={(item, index) => index?.toString()}
          renderItem={({item, index}) => (
            <ClassDetailBox
              item={item}
              buttonText="Mark Attendance"
              showButton={
                item?.alertMessage ==
                  'You have already marked your attendance!' ||
                item.alertMessage == 'Attendance code expired!'
                  ? false
                  : true
              }
              onPress={() => handleAttendance(item)}
              // Pass the correct disabled state
              buttonDisableRequired={true}
              isButtonDisabled={attendanceButtonDisabledStates[index]}
            />
          )}
        />
      </View>
    </MainLayout>
  );
};

export default Home;
