//================================ React Native Imported Files ======================================//
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
/// ====================================== Local Imported Files ======================================//
import { useDispatch } from 'react-redux';


const Stack = createNativeStackNavigator();

const InstructorStack = () => {
  const dispatch = useDispatch();
   return (
    <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
    
    >
      
      
      </Stack.Navigator>
  );
};

export default InstructorStack;
