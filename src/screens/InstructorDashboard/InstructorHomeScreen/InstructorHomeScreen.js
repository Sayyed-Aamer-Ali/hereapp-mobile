import React, { useEffect, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ClassDetailBox, CustomFlatList, EmptyComponent, Header, LogoutModal, MainLayout } from '../../../components';
import styles from './styles';
import { instructorClasses } from '../../../Data/DummyData';
import { resetAuth } from '../../../redux/Reducers/AuthReducer';
import axiosWrapper from '../../../services/AxiosWrapper';
import { API_URLS } from '../../../services/apiPathList';



const Home = ({ navigation }) => {
  const [loasder, setLoasder] = useState(false)
  const [classes, setClasses] = useState([])
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const token = useSelector(state => state.auth.token);

  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = () => {
    setModalVisible(false);
    dispatch(resetAuth())
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    getInstructorClasses()
  }, [])

  const getInstructorClasses = async () => {
    setLoasder(true)
    try {
      let response = await axiosWrapper('GET', API_URLS.GET_CLASSES, null, token, false, 'json', false);
      setClasses(response.data)
    } catch (error) {

    } finally {
      setLoasder(false)
    }

  }

  // const logout = () => {
  //   Alert.alert("Warning", "Are you sure you want to logout",[
  //     {
  //       text:'Yes',
  //       onPress:() => dispatch(resetAuth()) 
  //     },
  //     {
  //       text:'No'
  //     }
  //   ])
  // }


  return (
    <MainLayout loader={loasder}>
      <View style={styles.cont}>
        <Header title="Home"
          showBackButton={false}
          isLogout={true}
          logoutOnPress={() => setModalVisible(true)}
        />
        <CustomFlatList
          listStyle={styles.listStyle}
          ListEmptyComponent={() => (
            <EmptyComponent />
          )}
          ListHeaderComponent={
            <View style={styles.headerCont}>
              <Text style={styles.welcome}>Welcome {user?.fullName},</Text>
              <Text style={styles.desc}>Please select a class to mark attendance</Text>
              <Text style={styles.headerText}>Classes to be held</Text>
            </View>
          }
          data={instructorClasses}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ClassDetailBox
              item={item}
              buttonText="Take Attendance"
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
