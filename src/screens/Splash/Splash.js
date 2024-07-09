import React from "react";
import { Image, Text, View } from "react-native";
import { Images } from "../../assets";
import styles from "./styles";

const Splash = ({navigation}) => {
 return (
    <View
      style={styles.cont} >
     <Image source={Images.SecondaryLogo} style={styles.logo} />
    <Text style={styles.titleText}>
      Here App
    </Text>
    <Text style={styles.regText}>
    Attendance Made Easier!
      </Text>
    </View>
  );
};

export default Splash;
