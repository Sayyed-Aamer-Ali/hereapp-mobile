import React, { useEffect } from "react";
import { Text, View } from "react-native";
import styles from "./styles";
import { Icons } from "../../assets";
import { UtilityMethods } from "../../utility";
import Routes from "../../navigation/Routes";
const Splash = ({navigation}) => {


  return (
    <View
      style={styles.cont}
      
    >
    <Icons.SplashIcon width={UtilityMethods.wp(100)} height={UtilityMethods.hp(30)}/> 
    <Text style={styles.titleText}>
      Here App Io 
    </Text>
    </View>
  );
};

export default Splash;
