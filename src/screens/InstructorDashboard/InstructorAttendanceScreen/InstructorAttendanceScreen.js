import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
 // Update the path to the actual file
import { Button, Header, MainLayout, ScreenWrapper,ShowDropdown } from '../../../components';
import { Colors, Fonts, Icons } from '../../../assets';
import { UtilityMethods, FontSize } from '../../../utility';
import styles from './styles';
import Routes from '../../../navigation/Routes';
import { attemptsData, expiryData } from '../../../Data/DummyData';
import axiosWrapper from '../../../services/AxiosWrapper';
import { API_URLS } from '../../../services/apiPathList';

import { useDispatch, useSelector } from 'react-redux';
import { setRefreshClasses } from '../../../redux/Reducers/TempData';

const InstructorAttendenceScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const item = route.params?.item;

  let attendanceData=route?.params?.item?.attendanceStatus?.data
 
  const token = useSelector(state => state.auth.token);
 


  const [otp, setOtp] = useState('XXX');
  const [loader, setLoader] = useState(false);
  const [attempts, setAttempts] = useState("");
  const [expiryTime, setExpiryTime] = useState(null);
  const [timer, setTimer] = useState(0);
  const [codeAttempError, setCodeAttempError] = useState("");
  const [codeExpiryError, setCodeExpiryError] = useState("");

  const [checkAttendanceMarked, setCheckAttendanceMarked] = useState(false);





useEffect(() => {
  if (timer > 0) {
    const interval = setInterval(() => {
      setTimer(timer - 1);
    }, 1000);
    return () => clearInterval(interval);
  }
}, [timer]);




useEffect(() => {
  if(attendanceData){
    setCheckAttendanceMarked(true)
    setOtp(attendanceData.attendanceCode)
    let codeAttempts = `${attendanceData.codeAttempts} Times`
    setAttempts(codeAttempts)
    let codeExpiryTime = UtilityMethods.calculateAttendanceDuration(attendanceData?.attendanceStartedAt, attendanceData?.attendanceExpiresAt)
    setExpiryTime(codeExpiryTime)
    let timeleft = UtilityMethods.calculateTimeLeftInSeconds(attendanceData?.attendanceStartedAt, attendanceData?.attendanceExpiresAt)
    
     
    startTimer(timeleft)
    
  }

}, [attendanceData]);




  const generateOtp = async() => {


    let error = false
    if (!attempts) {
      setCodeAttempError("Please select code attempts")
      error = true
    }
    if (!expiryTime) {
      setCodeExpiryError("Please select code expiry time")
      error = true
    }
    if (error) {
      return
    }

    

    const newOtp = UtilityMethods.generateAlphanumericOtp();
    setOtp(newOtp);


    setLoader(true)

    let split = expiryTime.split(" ")
    let timer = parseInt(split[0])

    let codeAttempts = parseInt(attempts.split(" ")[0])

 
   let data = {
    classID: item?._id,
    classScheduleID: item?.schedule?._id,
    codeAttempts: codeAttempts,
    attendanceCode: newOtp,
    codeExpiryTime: timer*60

   }



   
  

    try{

      let response = await axiosWrapper('POST', API_URLS.INSTRUCTOR_START_CLASS, data, token, false, 'json', false);
       
      setCheckAttendanceMarked(true)
      dispatch(setRefreshClasses("true"))

    startTimer(timer*60);

    }
    catch(e){
      console.log(e)
    }
    finally{
      setLoader(false)
    }
  };

  const startTimer = (seconds) => {
    setTimer(seconds);
  };

  // Format the remaining seconds into MM:SS format
  const formattedTime = `${Math.floor(timer / 60)
    .toString()
    .padStart(2, '0')} : ${(timer % 60).toString().padStart(2, '0')}`;

  const formatTimer = () => {
    const minutes = Math.floor(timer);
    const seconds = 0
    return `${minutes < 10 ? '0' : ''}${minutes} : ${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <MainLayout
     loader={loader}
    >
      <Header 
        title={"Generate Code"}
        showBackButton={true} 
        DrawerHeader={false} 
        />
      <ScreenWrapper style={styles.container}>
        <View style={styles.otpContainer}>
          <Text style={styles.otpText}>{otp}</Text>
          <Text style={styles.timerText}>{formattedTime} </Text>
        </View>
        <Text style={styles.instructionText}>
          Please share this code with students to mark their attendance.
        </Text>

        <View style={{rowGap:UtilityMethods.hp(2)}}>

      
        <ShowDropdown
          data={attemptsData}
          value={attempts}
          setValue={(value) => {
            setAttempts(value);
            setCodeAttempError("")
          }}
          placeTxt="3 Times"
          label="Code Attempts"
          style={styles.dropdown}
          error={codeAttempError}

        />
        <ShowDropdown
          data={expiryData}
          value={expiryTime}
          setValue={(value) => {
            setExpiryTime(value);
            
           
            setCodeExpiryError("")
          }}
          placeTxt="Code Expiry Time"
          label="Code Expiry Time"
          style={styles.dropdown}
          renderLeftIcon={() =>
          (<View style={{marginRight:UtilityMethods.wp(2)}}> 
            <Icons.ClockIcon  />
          </View>)}

          error={codeExpiryError}
        />
        </View>
        <Button
          text={"Generate New Code"}
        
          Icon={<Icons.Reload />}
          style={styles.generateButton(checkAttendanceMarked)}
          onPress={generateOtp}
          disabled={checkAttendanceMarked}
        />
        <Button
          text={"Show Attendance List"}
          Icon={<Icons.List />}
          style={styles.listButton}
          onPress={() => navigation.navigate(Routes.ATTENDENCE_LIST_SCREEN)}
          textStyle={styles.listButtonText}
        />
      </ScreenWrapper>
    </MainLayout>
  );
};

export default InstructorAttendenceScreen;
