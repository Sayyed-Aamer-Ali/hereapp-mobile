//================================ React Native Imported Files ======================================//
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Screen } from 'react-native-screens';
/// ====================================== Local Imported Files ======================================//
import { useDispatch } from 'react-redux';
import Routes from '../Routes';
import { InstructorHomeScreen } from '../../screens';


const Stack = createNativeStackNavigator();

const InstructorStack = () => {
  const dispatch = useDispatch();
   return (
    <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
    >
      <Stack.Screen name={Routes.INSTRUCTOR_HOME_SCREEN} component={InstructorHomeScreen} />
      
      </Stack.Navigator>
  );
};

export default InstructorStack;
