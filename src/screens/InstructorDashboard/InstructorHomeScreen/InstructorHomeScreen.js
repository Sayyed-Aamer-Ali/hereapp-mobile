import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Text, View,RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ClassDetailBox, CustomFlatList, EmptyComponent, Header, LogoutModal, MainLayout, ShowDropdown } from '../../../components';
import styles from './styles';
import { genders, instructorClasses } from '../../../Data/DummyData';
import { resetAuth, setFcmToken, setUser } from '../../../redux/Reducers/AuthReducer';
import axiosWrapper from '../../../services/AxiosWrapper';
import { API_URLS } from '../../../services/apiPathList';
import Routes from '../../../navigation/Routes';
import { checkAttendanceStatus, getCurrentDateInFormat, shouldDisableButton, sortClassesByDateTime, sortClassesByDayAndTime } from '../../../utility/FormateDate';
import { setRefreshClasses } from '../../../redux/Reducers/TempData';
import { UtilityMethods } from '../../../utility';



const Home = ({ navigation }) => {
 
  const [loader, setLoader] = useState(false)
 let classes = useRef(null);
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const fcmToken = useSelector(state => state.auth.fcmToken);
  let refreshClasses = useSelector(state => state.temp.refreshClasses);

  const token = useSelector(state => state.auth.token);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [emptyData, setEmptyData] = useState({
    title: user?.isApproved === 'PENDING' ? "Pending Approval" : "No Classes Found!",
    description: user?.isApproved === 'PENDING' ? "An email was sent to your institution admin to approve your account." : "Sorry we cannot find any registered classes for you."
  })


  useEffect(() => {
    setTimeout(async () => {
      UtilityMethods.requestPermission((res) => {
        if(res)
        updateDeviceTokenForNotificaiton(res)
      });
    }, 10);
  }, []);


  const updateDeviceTokenForNotificaiton = async (res) => {
    let payload = {
      fcmToken: res,
      isInAppNotificationEnabled: true
    }

    try {
      if (!fcmToken && fcmToken !== res) {
        let response = await axiosWrapper('PATCH', API_URLS.EDIT_PROFILE, payload, token, false, 'json', false);
        dispatch(setFcmToken(res))
      }
     

    } catch (error) {
     
    }
  }




  const handleLogout = () => {
    setModalVisible(false);
    dispatch(resetAuth())
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

 


  const handleRefreshClasses = useCallback(() => {
    if (refreshClasses) {
    
      getInstructorClasses(); // Call the function here
    }
  }, [refreshClasses, getInstructorClasses])





  useEffect(() => {
    getUserDetail()
    getInstructorClasses()
  }, []);

  const getUserDetail = async () =>{
    let userData = await axiosWrapper("GET",API_URLS.GET_USER(user?._id),null, token);
    dispatch(setUser(userData?.data))
  }



  useEffect(() => {
    handleRefreshClasses();
  }, [handleRefreshClasses]);
  
  const getInstructorClasses = async (isRefresh = true) => {
   classes.current = [];
     setLoader(true);
  
    try {
      // Fetch the list of classes
      let response = await axiosWrapper(
        'GET',
        `${API_URLS.GET_CLASSES}?date=${getCurrentDateInFormat()}`,
        null,
        token,
        false,
        'json',
        false
      );
  
       classes.current = response.data;

      if(!classes.current || classes.current.length === 0) {
         

      classes.current = [];
        return;
      }

       classes.current = sortClassesByDayAndTime(classes.current);
  
      // Process each class based on shouldDisableButton logic
      const classesWithAttendanceStatus = await Promise.all(
        classes.current.map(async (classItem) => {
          if (!shouldDisableButton(classItem)) {
            try {
              let data = {
                classID: classItem?._id,
                classScheduleID: classItem?.schedule?._id
              }
            
            
              const attendanceResponse = await axiosWrapper(
                'POST',
                API_URLS.CLASS_ATTENDANCE_STATUS,
                data,
                token,
                false,
                'json',
                false
              );
               
              // Add the attendance status to the class object
              return { ...classItem, attendanceStatus: attendanceResponse,showButtonDisabled:checkAttendanceStatus(
                attendanceResponse,
                user?.role
              ) };
            } catch (error) {
              console.error(`Error fetching attendance status for class ${classItem.id}`, error);
              return { ...classItem, attendanceStatus: null,showButtonDisabled:true  }; // Handle error
            }
          } else {
           
            // No API call, return class as is
            return { ...classItem, attendanceStatus: null,showButtonDisabled:true };
          }
        })
      );
  
      // Set the state with the classes that now include attendance status
      classes.current = classesWithAttendanceStatus;
    } catch (error) {
      console.error('Error fetching classes', error);
    } finally {
      dispatch(setRefreshClasses(false));
      setLoader(false);
      setRefreshing(false);
    }
  };
  
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getUserDetail()
    getInstructorClasses();
  }, []);

  const handleNavigation = (item) =>{
    navigation.navigate(Routes.INSTRUCTOR_ATTENDENCE_SCREEN,{item})
  }


  return (
    <MainLayout loader={loader}>
      <View style={styles.cont}>
        <Header title="Home"
          showBackButton={false}
          isLogout={true}
          logoutOnPress={() => setModalVisible(true)}
        />
        <CustomFlatList
          listStyle={styles.listStyle}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={() => (
            <EmptyComponent 
            title={emptyData?.title}
            desc={emptyData?.description}
            />
          )}
          ListHeaderComponent={
            <View style={styles.headerCont}>
              <Text style={styles.welcome}>Welcome {user?.firstName},</Text>
              <Text style={styles.desc}>Please select a class to take attendance</Text>
              <Text style={styles.headerText}>Classes to be held</Text>
            </View>
          }
          data={classes.current}
          keyExtractor={(item,index) => index?.toString()}
          renderItem={({ item }) => (
            <ClassDetailBox
              item={item}
              buttonText="Take Attendance"
              onPress={()=>handleNavigation(item)}
            />
          )}
        />

        <LogoutModal
          visible={modalVisible}
          onConfirm={handleLogout}
          onCancel={handleCancel}
        />
      </View>
    </MainLayout>



  );
}

export default Home;
