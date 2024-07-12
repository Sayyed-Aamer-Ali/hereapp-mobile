import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';


import { useDispatch } from 'react-redux';
import { Images } from '../../../assets';
import { AlertWithTwoButtons, Button, CountdownTimer, Header, MainLayout, OtpInput, ScreenWrapper } from '../../../components';
import Routes from '../../../navigation/Routes';
import { setToken, setUser } from '../../../redux/Reducers/AuthReducer';
import { UtilityMethods, Validator } from '../../../utility';
import styles from './styles';
import AlertService from '../../../services/AlertService';

const OtpVerification = ({navigation,route}) => {

let user = route?.params?.user; 
  
  const dispatch = useDispatch();
   
 const [resetCounter, setResetCounter] = useState(false);

 const [otp, setOtp] = useState({
    value:"",
    error:"",
    
  });




  const onPressVerify = () => {

    if(otp.value.length < 5){
      AlertService.toastPrompt("Please enter OTP","","error")
 
    }
    else{
      dispatch(setToken("DUMMY_TOKEN"));
      dispatch(setUser(user))
    }
  }

  const showAlert = () => {
    AlertWithTwoButtons({
      title: "OTP Expired",
      subtitle: "Resend OTP Again.",
      btnTitleFirst: "Resend OTP",
      btnTitleSecond: "Cancel",
      onPressButtonFirst: () => {
        setResetCounter(true)
      },
      onPressButtonSecond: () => {
        console.log("Cancel Pressed")
      }
    });


  }

  const showResendAlert = () => {
    AlertWithTwoButtons({
      title: "Resend OTP",
      subtitle: "Are you sure you want to resend OTP?",
      btnTitleFirst: "Yes",
      btnTitleSecond: "No",
      onPressButtonFirst: () => {
        setResetCounter(true)
      },
      onPressButtonSecond: () => {
        console.log("Cancel Pressed")
      }
    });


  }

  return (
    <MainLayout>
     <Header title={"Sign In"} />

      <ScreenWrapper
      style={styles.cont}
      contentContainerStyle={styles.contentContainerStyle}
      >
        <Image style={styles.logo} source={Images.LOGO} />

        <View style={styles.inPutCont}>
       
         <Text style={styles.mainText}>
          Email Verification
         </Text>

         <Text style={styles.regText}>
         {"We have sent you an OTP on your email, please enter in these fields to get verified"}
       
         </Text>
         <View style={styles.optView}>

         <OtpInput
          numOfDigits={5}
         onComplete={(otp) => {
         setOtp({
            ...otp,
            value:otp,
            error:""
         })
        
      }
      } />
       <CountdownTimer
        countDownTime={180}
        reset={resetCounter}
        counterStarted={() => {
          setResetCounter(false)
        }}
        contStyle={styles.countCant}
      setonCounterFinished={(isFinished) => {
     
         showAlert()
       



      }
      } />
         </View>
        
        </View>


         <Button
          text={"Verify"}
          style={{
            marginTop:UtilityMethods.hp(4)
          
          }}
          onPress={() => {
            onPressVerify()
          }}
       
        />

        <TouchableOpacity
        onPress={() => {
          showResendAlert()
        }}
        >
        <Text style={styles.boldText}>

        Resend OTP
        </Text>
        </TouchableOpacity>
      
        </ScreenWrapper>
   
    </MainLayout>
  );
}

export default OtpVerification;
