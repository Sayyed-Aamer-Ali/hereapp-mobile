import React, { useEffect, useState } from 'react';
import { Alert, Keyboard, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Header, MainLayout, ModifiedOTPInput, OtpInput, SuccessModal } from '../../../components';
import { CommonStyles, UtilityMethods } from '../../../utility';
import styles from './styles';
import { Icons, Colors } from '../../../assets'; 
import ClassDetails from '../../../components/ClassDetail';
import { formatSchedule } from '../../../utility/FormateDate';
import axiosWrapper from '../../../services/AxiosWrapper';
import { API_URLS } from '../../../services/apiPathList';
import { setRefreshClassesForStudent } from '../../../redux/Reducers/TempData';

import io from 'socket.io-client';
import BaseUrl from '../../../services/BaseUrl';

const Attendance = ({ navigation, route }) => {
  const item = route.params?.item;

  const newSocket = io.connect(BaseUrl);

  let attendanceData = item?.attendanceStatus?.data

  const MAX_ATTEMPTS = attendanceData?.codeAttempts;
  const token = useSelector(state => state.auth.token);



  const dispatch = useDispatch();
  const [otpInp, setOtpInp] = useState("");
  const [location, setLocation] = useState(null);
  const [loader, setLoader] = useState(false);
  const [attemptsLeft, setAttemptsLeft] = useState(
    attendanceData?.codeAttempts
  );
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleShowModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    navigation.goBack()
  };

  
  useEffect(() => {
    UtilityMethods.getUserCurrentLocation((location) => {
      setLocation(location);
    });
  }, []);

  const handleSubmit = async() => {
   
    if (!otpInp) {
      setErrorMessage("Please Enter OTP");
      return;
    }


    let data={
      scheduleID:item?.schedule?._id,
      attendanceCode:otpInp,
      location:{
        
        
          lat: location?.coords?.latitude,
          lng: location?.coords?.longitude
          
          
          
          
          
          
          
          
      }
    }


     setLoader(true);

       try{
        let response = await axiosWrapper('POST', API_URLS.MARKK_ATTENDANCE, data, token, false, 'json', false);

        newSocket.emit('markAttendance', response?.data);
        dispatch(setRefreshClassesForStudent(true));
        
        setErrorMessage('');
        handleShowModal()
      }
      catch(e){
        console.log("error",e)
        let splitError = e?.split(" ");
        let attemptsLeft = parseInt(splitError[4]); // Convert the value to an integer
        
        // Ensure attemptsLeft is a valid number before proceeding
        if (!isNaN(attemptsLeft)) {
            attemptsLeft -= 1; // Subtract 1 from the attemptsLeft
        
            setAttemptsLeft(attemptsLeft); // Set the updated attemptsLeft value
            if (attemptsLeft >= 0) {
                setErrorMessage(`Wrong Code, You have ${attemptsLeft} Attempts Left.`);
            } else {
                setErrorMessage("No Attempts Left, You’ve been marked absent!");
            }
        } else {
            console.error("Failed to parse attemptsLeft as a number.");
            setErrorMessage("An error occurred, please try again.");
        }
        
      }
      finally{
    
        setLoader(false);
      }



   

   


    
  };

  const handleRequestExcusedAbsence = () => {
  
    Alert.alert("Request Submitted", "Your request for an excused absence has been submitted.");
    
  };
  const { formattedTimeSlot } = formatSchedule(item?.schedule)
  return (
    <MainLayout loader={loader}>
      <Header title={"Mark Attendance"} showBackButton={true} DrawerHeader={false} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <Text style={styles.title}>Enter the One Time Code to Join the Class</Text>

        <ModifiedOTPInput
          value={otpInp}
          setValue={setOtpInp}
          style={styles.otpContainer}
          keyboardType="email-address"
        />

        <Button
          text={attemptsLeft > 0 ? "Submit" : "Request Excused Absence"}
          Icon={<Icons.Right />}
          onPress={attemptsLeft > 0 ? handleSubmit : handleRequestExcusedAbsence}
        />

        <Text style={[styles.error, { color: attemptsLeft < MAX_ATTEMPTS ? Colors.RED : Colors.BLACK }]}>
          {errorMessage || `You have total ${attemptsLeft} Attempts`}
        </Text>

        <ClassDetails
          section={item.semester}
          instructor={`${item?.createdBy?.firstName} ${item?.createdBy?.lastName}`}
          date={item?.schedule?.day}
          timeSlot={formattedTimeSlot}
        />

        <View style={styles.container}>
          <Text style={styles.noteTitle}>Please Note:</Text>
          <View style={styles.noteBody}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.noteText}>
              You can attempt for the maximum of <Text style={styles.highlightText}> {attemptsLeft} Times.</Text>
            </Text>
          </View>
          <View style={styles.noteBody}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.noteText}>
              After you are out of all attempts, you’ll be marked absent.
            </Text>
          </View>
          <View style={styles.noteBody}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.noteText}>
             {`Your location ${item?.geoTracking=="enable"?"will be":"will not be"} recorded at the time of marking the attendance.`}
            </Text>
          </View>
        </View>
      </ScrollView>
      <SuccessModal visible={isModalVisible} onClose={handleCloseModal} />
    </MainLayout>
  );
};

export default Attendance;
