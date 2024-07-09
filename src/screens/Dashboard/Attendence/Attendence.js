import React, { useEffect, useState } from 'react';
import { Alert, Keyboard, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import OTPInputView from '@twotalltotems/react-native-otp-input'

import { AlertWithTwoButtons, Button, CountdownTimer, OtpInput } from '../../../components';
import { CommonStyles, UtilityMethods } from '../../../utility';
import styles from './styles';

const Attendance = ({navigation}) => {
  const dispatch = useDispatch();
  const [location, setLocation] = useState(null);

  useEffect(() => {
    UtilityMethods.getUserCurrentLocation((location) => {
      setLocation(location);
    }
    );
  }
  , []);


  const showAlert = () => {
    AlertWithTwoButtons({
      title: "OTP Expired",
      subtitle: "Please ask your instructor to mark your attendance again.",
      btnTitleFirst: "Ok",
      btnTitleSecond: "Cancel",
      onPressButtonFirst: () => {
        navigation.goBack();
      },
      onPressButtonSecond: () => {
        console.log("Cancel Pressed")
      }
    });


  }

  return (
    <TouchableOpacity style={[CommonStyles.BODY,styles.cont]}
      activeOpacity={1}
      onPress={()=>{
        Keyboard.dismiss();
      }}
    >

      <Text style={styles.titleText}>
     Please Enter OTP
      </Text>
      <View style={styles.bodyView}>
     <OtpInput onComplete={(otp) => {
        console.log("OTP", otp)
      }
      } />
    
    <View style={{height:UtilityMethods.hp(7)}}/>
      <CountdownTimer  
      setonCounterFinished={(isFinished) => {

        showAlert()
       



      }
      } />


      <Button 
      text={"Submit"}
      onPress={()=>{
        navigation.goBack();
      }}
      style={styles.button}
      />
     
   </View>
    </TouchableOpacity>
  );
}

export default Attendance;
