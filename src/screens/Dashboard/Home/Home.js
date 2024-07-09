import React from 'react';
import { View, Text } from 'react-native';
import { Button } from '../../../components';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../redux/Reducers/AuthReducer';
import { CommonStyles } from '../../../utility';
import styles from './styles';
import Routes from '../../../navigation/Routes';

const Home = ({navigation}) => {
  const dispatch = useDispatch();

  return (
    <View style={[CommonStyles.BODY,styles.cont]}>

      <Text style={styles.titleText}>
        Welcome Alex
      </Text>

      <Button 
      text={"Logout"}
      onPress={()=>{
        dispatch(setUser(null))
      }}
      style={styles.button}

      />

      <Button 
      text={"Mark Attendance"}
      onPress={()=>{
        navigation.navigate(Routes.ATTENDANCE)
      }}
      style={styles.button}

      />
      
      <Button 
      text={"Edit Profile"}
      onPress={()=>{
        navigation.navigate(Routes.EDIT_PROFILE)
      }}
      style={styles.button}

      />
       <Button 
      text={"Excuse Attendance"}
      onPress={()=>{
        navigation.navigate(Routes.EXCUSE_ATTENDANCE)
      }}
      style={styles.button}

      />
   
   
    </View>
  );
}

export default Home;
