//================================ React Native Imported Files ======================================//
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

/// ====================================== Local Imported Files ======================================//
import {Login,SignUp } from "../../screens";
import Routes from "../Routes";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
 

  return (
    <Stack.Navigator 
    
    screenOptions={{
      headerShown: false,
    
    }}
    >
      <Stack.Screen name={Routes.LOGIN} component={Login} />
      <Stack.Screen name={Routes.SIGNUP} component={SignUp} />
      </Stack.Navigator>
  );
};

export default AuthStack;
