import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
  ImageBackground,
} from "react-native";
import styles from "./styles";
import { Colors } from "../../assets";
const returnLoadingComponent = () => {
  return <ActivityIndicator size="small" color={Colors.WHITE} />;
};

const returnNormalView = (text, textStyle, Icon, customButton, disabled) => {
  return (
    
       <View style={styles.buttonWithIcon}>
          
          <Text style={[styles.buttonText, textStyle]}>{text}</Text>
          <View style={styles.iconView}>
          {Icon}
          </View>
         
        </View>
      
  
  );
};
 const Button = ({
  style,
  text,
  textStyle,
  Icon,
  disabled = false,
  onPress,
  loading = false,
  customButton = false,
}) => {
  return (
    <TouchableOpacity
      style={[styles.mainContainer, style]}
      activeOpacity={0.7}
      disabled={disabled}
      onPress={onPress}
      hitSlop={7}
    >
      {loading
        ? returnLoadingComponent()
        : returnNormalView(text, textStyle, Icon, customButton, disabled)}
    </TouchableOpacity>
  );
};

export default Button;
