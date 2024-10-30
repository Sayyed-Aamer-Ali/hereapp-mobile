import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { EmptyComponent, Header, MainLayout } from '../../../components';
import { attendanceData } from '../../../Data/DummyData';
import AttendanceHistoryComponent from '../../../components/AttendanceHistoryComponent';
import styles from './style';
import axiosWrapper from '../../../services/AxiosWrapper';
import { API_URLS } from '../../../services/apiPathList';
import { useSelector } from 'react-redux';

import moment from "moment-timezone"

const History = () => {


  const [attendanceList, setAttendanceList] = useState([]);
  const [loader, setLoader] = useState(false);
  const token = useSelector(state => state.auth.token);

  const user = useSelector(state => state.auth.user);

  

  useEffect(() => {
    getAttendanceList();
  }, []);


  const getAttendanceList = async () => {
    setLoader(true);
    let baseUrl = `${API_URLS.ATTENDENCE_HISTORY}?studentID=${user?._id}`;

    try {
      let response = await axiosWrapper('GET', baseUrl, null, token, false, 'json', false);

    
      
      setAttendanceList(response.data);
   
    
  
    } catch (error) {
      console.error("Error getting attendance list:", error);
    } finally {
      setLoader(false);
    }
  };

  const renderItem = ({ item }) => (

    <AttendanceHistoryComponent
      status={item?.status}
      className={item?.attendanceDetail?.classDetail?.name}
      dateTime={item?.attendanceDetail?.classDetail?.createdAt}
      schedule={item?.attendanceDetail?.classDetail.schedule[0]}
    />
  );

  return (
    <MainLayout loader={loader}>

      <Header title="Attendance History"
        showBackButton={false}
        DrawerHeader={true}
      />

      <FlatList
        data={attendanceList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContentContainer}
        ListEmptyComponent={() => (

          !loader && <EmptyComponent
          title={'No Classes Found!'}
          desc={'Sorry we cannot find any registered classes for you. Please contact your instructor to add you to their class lists.'}
          />
        
          
        
        )}
      />
    

      {/* <View style={styles.imgContainer}>

        <Image
          source={{ uri: 'http://15.235.162.99:3556/assets/coming-soon-DrP5VIqS.png' }}
          style={styles.image}
          resizeMode='contain'
        />

      </View> */}

    </MainLayout>
  );
}

export default History;
