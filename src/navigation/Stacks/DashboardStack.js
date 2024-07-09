//================================ React Native Imported Files ======================================//
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
/// ====================================== Local Imported Files ======================================//
import { useDispatch } from 'react-redux';
import {Home,Attendance,EditProfile,ExcuseAttandence} from '../../screens';
import Routes from '../Routes';


const Stack = createNativeStackNavigator();

const DashboardStack = () => {
  const dispatch = useDispatch();
   return (
    <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
    
    >
      <Stack.Screen name={Routes.HOME} component={Home} />
      <Stack.Screen name={Routes.ATTENDANCE} component={Attendance} />
      <Stack.Screen name={Routes.EDIT_PROFILE} component={EditProfile} />
      <Stack.Screen name={Routes.EXCUSE_ATTENDANCE} component={ExcuseAttandence} />
      
      </Stack.Navigator>
  );
};

export default DashboardStack;
