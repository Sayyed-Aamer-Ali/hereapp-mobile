import React from 'react';
import { Alert, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ClassDetailBox, CustomFlatList, Header, MainLayout } from '../../../components';
import styles from './styles';
import { MyClasses } from '../../../Data/DummyData';
import { resetAuth } from '../../../redux/Reducers/AuthReducer';



const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  const logout = () => {
    Alert.alert("Warning", "Are you sure you want to logout",[
      {
        text:'Yes',
        onPress:() => dispatch(resetAuth()) 
      },
      {
        text:'No'
      }
    ])
  }


  return (
    <MainLayout>
      <View style={styles.cont}>
        <Header title="Home"
          showBackButton={false}
          isLogout={true}
          logoutOnPress={logout}
        />
        <CustomFlatList
          listStyle={styles.listStyle}
          ListHeaderComponent={
            <View style={styles.headerCont}>
              <Text style={styles.welcome}>Welcome {user?.fullName},</Text>
              <Text style={styles.desc}>Please select a class to mark attendance</Text>
              <Text style={styles.headerText}>Classes to be held</Text>
            </View>
          }
          data={MyClasses}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ClassDetailBox item={item} />
          )}


        />
      </View>
    </MainLayout>



  );
}

export default Home;
