//================================ React Native Imported Files ======================================//
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
/// ====================================== Local Imported Files ======================================//
import { useDispatch,useSelector } from 'react-redux';
import {StudentStack,InstructorStack} from "./index"
import Routes from '../Routes';

const Stack = createNativeStackNavigator();

const DashboardStack = () => {
  const user = useSelector(state => state.auth.user);

  
   return (
    <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
    
    >
      {user?.role == "STUDENT" ? (
        <Stack.Screen name={Routes.StudentStack} component={StudentStack} />
      ) : (
        <Stack.Screen name={Routes.InstructorStack}component={InstructorStack} />
      )}
     
      
      </Stack.Navigator>
  );
};

export default DashboardStack;
