import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ClassDetailBox, CustomFlatList, EmptyComponent, Header, MainLayout, ModifiedOTPInput } from '../../../components';
import styles from './styles';
import { MyClasses } from '../../../Data/DummyData';
import Routes from '../../../navigation/Routes';
import axiosWrapper from '../../../services/AxiosWrapper';
import { API_URLS } from '../../../services/apiPathList';



const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loasder, setLoasder] = useState(false)
  const [classes, setClasses] = useState([])
  const user = useSelector(state => state.auth.user);
  const token = useSelector(state => state.auth.token);


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

  const handleAttendance = (item) => {
    navigation.navigate(Routes.ATTENDANCE, {item})
  }

  return (
    <MainLayout loader={loasder}>
      <View style={styles.cont}>
        <Header title="Home"
          showBackButton={false}
          DrawerHeader={true}

        />
        <CustomFlatList
          listStyle={styles.listStyle}
          ListEmptyComponent={() => (
            <EmptyComponent />
          )}
          ListHeaderComponent={
            <View style={styles.headerCont}>
              <Text style={styles.headerText}>My Classes</Text>
              <Text style={styles.regText}>
                for Thursday, 20th Feb 2024
              </Text>
            </View>
          }
          data={MyClasses}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ClassDetailBox
              item={item}
              onPress={() => handleAttendance(item)}
            />
          )}/>

      </View>
    </MainLayout>
  );
}

export default Home;
