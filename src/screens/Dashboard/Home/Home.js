import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Text, View, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ClassDetailBox, CustomFlatList, EmptyComponent, Header, MainLayout, ModifiedOTPInput } from '../../../components';
import styles from './styles';
import { MyClasses } from '../../../Data/DummyData';
import Routes from '../../../navigation/Routes';
import axiosWrapper from '../../../services/AxiosWrapper';
import { API_URLS } from '../../../services/apiPathList';
import formatDate, { checkAttendanceStatus, getCurrentDateInFormat, shouldDisableButton, sortClassesByDayAndTime } from '../../../utility/FormateDate';
import { setRefreshClassesForStudent } from '../../../redux/Reducers/TempData';

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
let classes = useRef(null);
  const user = useSelector(state => state.auth.user);
  const token = useSelector(state => state.auth.token);
  let refresh = useSelector(state => state.temp.refreshClassesForStudent);




  


  const handleRefreshClasses = useCallback(() => {
    if (refresh) {
     
      getInstructorClasses(); // Call the function here
    }
  }, [refresh, getInstructorClasses])

 


  useEffect(() => {
   
    getInstructorClasses()
  }, []);


  useEffect(() => {
    handleRefreshClasses();
  }, [handleRefreshClasses]);


  const getInstructorClasses = async (isRefresh = true) => {
    if (isRefresh) setLoader(true);
   classes.current = [];
  
    try {
      // Fetch the list of classes
      let response = await axiosWrapper('GET', `${API_URLS.GET_CLASSES}?date=${getCurrentDateInFormat()}`, null, token, false, 'json', false);
  
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
              return { ...classItem, attendanceStatus: attendanceResponse,showButtonDisabled:false };
            } catch (error) {
              console.error(`Error fetching attendance status for class`, error);
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
      dispatch(setRefreshClassesForStudent(false));
      setLoader(false);
      setRefreshing(false);
    }
  };
  

  const handleAttendance = (item) => {
    navigation.navigate(Routes.ATTENDANCE, { item });
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getInstructorClasses();
  }, []);

  return (
    <MainLayout loader={loader}>
      <View style={styles.cont}>
        <Header title="Home"
          showBackButton={false}
          DrawerHeader={true}
        />
        <CustomFlatList
          listStyle={styles.listStyle}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={() => (
            <EmptyComponent 
            title={'No Classes Found!'}
            desc={'Sorry we cannot find any registered classes for you. Please contact your instructor to add you to their class lists.'}
            />
          )}
          ListHeaderComponent={
            <View style={styles.headerCont}>
              <Text style={styles.headerText}>My Classes</Text>
              <Text style={styles.regText}>
                for {formatDate(new Date())}
              </Text>
            </View>
          }
          data={classes.current}
          keyExtractor={(item,index) => index?.toString()}
          renderItem={({ item }) => (
            <ClassDetailBox
              item={item}
              buttonText="Mark Attendance"
              onPress={() => handleAttendance(item)}
            />
          )}
        />
      </View>
    </MainLayout>
  );
}

export default Home;
