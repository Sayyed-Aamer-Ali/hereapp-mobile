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


const InstructorAttendenceScreen = ({ navigation, route }) => {
  const item = route.params?.item;

  console.log("item", item)


  const [otp, setOtp] = useState('XXX');
  const [loader, setLoader] = useState(false);
  const [attempts, setAttempts] = useState(null);
  const [expiryTime, setExpiryTime] = useState(null);
  const [timer, setTimer] = useState(0);
  const [codeAttempError, setCodeAttempError] = useState("");
  const [codeExpiryError, setCodeExpiryError] = useState("");

  const [checkAttendanceMarked, setCheckAttendanceMarked] = useState(false);


useEffect(() => {
  checkAttendanceStatus()

}, [])



  const checkAttendanceStatus = async() => {

    let data = {
      classID: item?._id,
      classScheduleID: item?.schedule?._id
    }

    setLoader(true)

    try{

      let response = await axiosWrapper('POST', API_URLS.CLASS_ATTENDANCE_STATUS, data, null, false, 'json', false);
       if(response?.message == "Attendance code already generated!"){
        setCheckAttendanceMarked(true)
       }
        else{
          setCheckAttendanceMarked(false)
        }
      // setCheckAttendanceMarked(response.data?.attendanceMarked)

    }
    catch(e){
      console.log(e)
    }
    finally{
      setLoader(false)
    }

  }




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

    

    const newOtp = Math.floor(100 + Math.random() * 900).toString();
    setOtp(newOtp);


    setLoader(true)
 
   let data = {
    classID: item?._id,
    classScheduleID: item?.schedule?._id,
    codeAttempts: attempts,
    attendanceCode: newOtp,
    codeExpiryTime: expiryTime*60

   }



   console.log("data", data)
  

    try{

      let response = await axiosWrapper('POST', API_URLS.INSTRUCTOR_START_CLASS, data, null, false, 'json', false);
       
      setCheckAttendanceMarked(true)

    }
    catch(e){
      console.log(e)
    }
    finally{
      setLoader(false)
    }
  };

  const startTimer = (minutes) => {
    setTimer(minutes * 60);
  };

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
          <Text style={styles.timerText}>{formatTimer()}</Text>
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
            setTimer(value)
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
