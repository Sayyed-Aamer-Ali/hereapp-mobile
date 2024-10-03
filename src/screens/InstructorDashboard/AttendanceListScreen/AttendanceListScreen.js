import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { UtilityMethods, } from '../../../utility';
import { EmptyComponent, Header, MainLayout, StudentAttendanceListCard } from '../../../components';

import Routes from '../../../navigation/Routes';

import io from 'socket.io-client';
import BaseUrl, { SocketUrl } from '../../../services/BaseUrl';
import { API_URLS } from '../../../services/apiPathList';
import { useSelector } from 'react-redux';
import axiosWrapper from '../../../services/AxiosWrapper';


const AttendanceListScreen = ({ navigation, route }) => {
  const [attendanceList, setAttendanceList] = useState([]);
  const [geoTracking, setGeoTracking] = useState("disable");
  const [loader, setLoader] = useState(false);
  const token = useSelector(state => state.auth.token);
  const data = route?.params?.data;


 

  useEffect(() => {
    const newSocket = io.connect(SocketUrl, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionDelay: 500,
      reconnectionAttempts: Infinity,
    });

    const initSocket = () => {
      newSocket.on("attendanceMarked", (data) => {
      
        try {
          const parsedData = typeof data === 'string' ? JSON.parse(data) : data;
      
          setAttendanceList(prevList => [...prevList, parsedData]);
        } catch (error) {
          console.error("Error parsing data:", error);
        }
      });
    };

    if (data) {
      getAttendanceList();
      initSocket();
    }

    return () => {
      newSocket.disconnect();
    };
  }, [data]);

  const getAttendanceList = async () => {
    setLoader(true);
    let baseUrl = `${API_URLS.FETCH_ATTENDANCE}/${data?._id}`;
    try {
      let response = await axiosWrapper('GET', baseUrl, null, token, false, 'json', false);
    setAttendanceList(response.data?.presentStudents);
    setGeoTracking(response.data?.classDetail?.geoTracking);
    } catch (error) {
      console.error("Error getting attendance list:", error);
    } finally {
      setLoader(false);
    }
  };

  const renderItem = ({ item }) => (
    <StudentAttendanceListCard
      student={item}
      locationPress={() => navigation.navigate(Routes.ATTENDENCE_LOCATION_SCREEN, {
        location: item.location,
        name: item.studentDetails.firstName + " " + item.studentDetails.lastName,
        schoolName: item.studentDetails.schoolName,
        
      })}
      showLocation={geoTracking === "enable" ? true : false}
    />
  );

  return (
    <MainLayout loader={loader}>
      <View style={styles.container}>
        <Header
          title={"Attendance List"}
          showBackButton={true}
          DrawerHeader={false}
        />
        <FlatList
          data={attendanceList}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
            <EmptyComponent
            title={'No Student Found!'}
            desc={'No student has marked their attendance yet.'}
          
            />
            </View>
          )}

        />
      </View>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingVertical: UtilityMethods.hp(2),
    flexGrow: 1,
  },
    emptyContainer: {
        flex: 1,
        paddingTop: UtilityMethods.hp(10),

    },
});

export default AttendanceListScreen;
