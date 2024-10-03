import React, { useEffect, useState } from 'react';
import { Alert, Keyboard, Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Header, MainLayout, ModifiedOTPInput, OtpInput, SuccessModal } from '../../../components';
import { CommonStyles, UtilityMethods } from '../../../utility';
import styles from './styles';
import { Icons, Colors } from '../../../assets';
import ClassDetails from '../../../components/ClassDetail';
import { formatSchedule } from '../../../utility/FormateDate';
import axiosWrapper from '../../../services/AxiosWrapper';
import { API_URLS } from '../../../services/apiPathList';
import Geocoder from 'react-native-geocoding';
import { setRefreshClassesForStudent } from '../../../redux/Reducers/TempData';

import io from 'socket.io-client';
import BaseUrl, { SocketUrl } from '../../../services/BaseUrl';
import AlertService from '../../../services/AlertService';
import moment from "moment-timezone"
import Routes from '../../../navigation/Routes';
import DeviceInfo from 'react-native-device-info';

const Attendance = ({ navigation, route }) => {
  const item = route.params?.item;

  const newSocket = io.connect(SocketUrl, {
    transports: ['websocket'],
    'reconnection': true,
    'reconnectionDelay': 500,
    'reconnectionAttempts': Infinity,
  });

  let attendanceData = item?.attendanceStatus?.data



  const MAX_ATTEMPTS = attendanceData?.codeAttempts;
  const token = useSelector(state => state.auth.token);



  const dispatch = useDispatch();
  const [otpInp, setOtpInp] = useState("");
  const [location, setLocation] = useState(null);
  const [deviceName, setDeviceName] = useState(null);
  const [loader, setLoader] = useState(false);
  const [attemptsLeft, setAttemptsLeft] = useState(
     attendanceData?.codeAttempts - attendanceData?.codeAttemptsBy.length
  );
  const [absenceItem, setAbsenceItem] = useState(null)

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
    Geocoder.init("AIzaSyB6XRs-qCpdktWttSDGLKMaiTiYdsUowdM");
    UtilityMethods.getUserCurrentLocation((location) => {
     
      setLocation(location)
      
      getFormtAddress(location?.position?.coords?.latitude, location?.position?.coords?.longitude,location?.sucess)

      
    });
    fetchDeviceName();
   
  }, []);


  const fetchDeviceName = async () => {
    const deviceName = await DeviceInfo.getDeviceName();

    setDeviceName(deviceName);
    
  }
  const handleSubmit = async () => {

    if (!otpInp) {
      setErrorMessage("Please Enter OTP");
      return;
    }


    if (!location?.sucess && attendanceData?.classDetail.geoTracking == "enable") {

      if (location?.error == "Permission Denied") {
        Alert.alert("Location Permission", "Please enable location permission to mark attendance.", [
          {
            text: "Go to Settings",
            onPress: () => {
              Linking.openSettings();
            },

          },
          {
            text: "Cancel",
            cancelable: true,
          }
        ]);

        return;
      }
      else {
        Alert.alert("Location Not Found", "Please enable location to mark attendance.");
        return;
      }
    }

    let data = {
      scheduleID: item?.schedule?._id,
      attendanceCode: otpInp,
      location: {
        lat: location?.latitude,
        lng: location?.longitude,
        address:`${location?.address}${location?.city},${location?.country}`,
        device: deviceName



      },
   
      
      
    }

    console.log("data", data);



    setLoader(true);

    try {
      let response = await axiosWrapper('POST', API_URLS.MARKK_ATTENDANCE, data, token, false, 'json', false, attemptsLeft===1);


      let emitDatra = {
        attendanceMarkedAt: moment().tz('America/Chicago'),
        location: {
          lat: location?.latitude,
          lng: location?.longitude,
          address:`${location?.address}${location?.city},${location?.country}`,
          device: deviceName,
  
  
  
        },
    
        studentDetails: response?.data

      }

      newSocket.emit('markAttendance', emitDatra);
      // dispatch(setRefreshClassesForStudent(true));

      setErrorMessage('');
      handleShowModal()
    }
    catch (e) {
      console.error("Error marking attendance", e);
      let splitError = attemptsLeft === 1 ? e?.msg?.split(" ") :  e?.split(" ");

      let attemptsLeft1 = parseInt(splitError[4]); 
      
      if (!isNaN(attemptsLeft1)) {
        attemptsLeft1 -= 1; 
        setAttemptsLeft(attemptsLeft1)
        setAbsenceItem(e?.data?.data)
        if (attemptsLeft1 >= 0) {
          setErrorMessage(`Wrong Code, You have ${attemptsLeft1} Attempts Left.`);
        } else {
          setErrorMessage("No Attempts Left, You’ve been marked absent!");
        }
      } else {
         if(e.includes("attendance has been conducted"))
          {
            setErrorMessage("Class attendance has been conducted. Please request excused attendance")
            setAttemptsLeft(0)
          }
          else{
            setErrorMessage("An error occurred, please try again.");
          }
      
      }

    }
    finally {
      dispatch(setRefreshClassesForStudent(true));
      setLoader(false);
    }
  };

  const getFormtAddress = async (latitude, longitude,sucess) => {

    Geocoder.from(latitude, longitude)
    .then((json) => {
      var addressComponent = json.results[0];
      var address = '';
      var city = '';
      var country = '';
      addressComponent.formatted_address.split(',').map((item, index) => {
        // last index for country
        if (
          index ==
          addressComponent.formatted_address.split(',').length - 1
        ) {
          country = item;
        }
        // second last index for province
        else if (
          index ==
          addressComponent.formatted_address.split(',').length - 2
        ) {
          province = item;
        }
        // third last index for city
        else if (
          index ==
          addressComponent.formatted_address.split(',').length - 3
        ) {
          city = item;
        } else {
          address = address + item + ',';
        }
      });

      const addressFromMap = {
        address: address,
        city: city,
        country: country,
        province: province,
        latitude: latitude,
        longitude: longitude,
        sucess:sucess
      };
      // console.log('addressFromM', addressFromMap);
      
      setLocation(addressFromMap);
    })
    .catch((error) => {
      console.log('error', error);
        AlertService.show("Error", "Failed to get location", "OK", () => { });
        setLocation({
          address: "Location Not Found",
          city: "",
          country: "",
          province: "",
          latitude: latitude,
          longitude: longitude,
          sucess:sucess
        })
    });


  }
     





  const handleRequestExcusedAbsence = () => {

    // Alert.alert("Request Submitted", "Your request for an excused absence has been submitted.");

    navigation.navigate(Routes.EXCUSE_ATTENDANCE_DETAIL_SCREEN, {
      data: absenceItem,
    })
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
          setValue={
            (value) => {
              setOtpInp(value);
              setErrorMessage('');
            }}
          style={styles.otpContainer}
          keyboardType="email-address"
        />

        <Button
          text={attemptsLeft > 0 ? "Submit" : "Request Excused Absence"}
          Icon={<Icons.Right />}
          onPress={attemptsLeft > 0 ? handleSubmit : handleRequestExcusedAbsence}
        />


        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> :
          <Text style={[styles.error, { color: Colors.BLACK }]}>
            {`You have total ${attemptsLeft} Attempts`}
          </Text>
        }

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
              {`Your location ${item?.geoTracking == "enable" ? "will be" : "will not be"} recorded at the time of marking the attendance.`}
            </Text>
          </View>
        </View>
      </ScrollView>
      <SuccessModal visible={isModalVisible} onClose={handleCloseModal} />
    </MainLayout>
  );
};

export default Attendance;
