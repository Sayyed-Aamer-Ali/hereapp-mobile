import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, ExcuseInformationSection, FileUploadComponent, Header, MainLayout, ReasonTextInput } from '../../../components';
import styles from './styles';
import Routes from '../../../navigation/Routes';
import axiosWrapper from '../../../services/AxiosWrapper';
import { API_URLS } from '../../../services/apiPathList';
import { useSelector } from 'react-redux';


const ExcuseAttendanceDetailScreen = ({ navigation,route }) => {

  let data = route?.params?.data;
  const token = useSelector(state => state.auth.token);

  const [reason, setReason] = useState('');
  const [reasonError, setReasonError] = useState('');
  const [fileError, setFileError] = useState('');
  const [file, setFile] = useState([]);
  const [loader, setLoader] = useState(false);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleSubmit = async() => {

    let error = false;

    if(!reason){
      setReasonError('Please enter reason for absence');
      error = true;
    
    }

    if(file.length === 0){
      setFileError('Please upload a file');
      error = true;
    }




    if(!error){

    setLoader(true);


    let attendanceData ={
      attendanceID :data._id,
      reason : reason,
      attachment : file[0]
    }

  

    try{
     let response = await axiosWrapper('POST', API_URLS.EXCUSE_ABSENCE, attendanceData, token, false, 'json', true);
      
     navigation.navigate(Routes.EXCUSE_ATTENDANCE_SUCCESS_SCREEN)
    }
    catch(error){
      
      
    }
    finally{
      setLoader(false);
    }
  }

    
  };

  return (
    <MainLayout loader={loader}>
      <Header title="Excused Absence" onBackPress={handleBackPress} />
      <ExcuseInformationSection
        className={data?.classDetail?.name}
        classSection={data?.classDetail?.semester}
        dateTime={data?.classDetail?.schedule[0]}
        day={data?.classDetail?.createdAt}
      
      />
      <ReasonTextInput reason={reason} setReason={
        (text) => {
          setReason(text);
          setReasonError('');
        }
      } 
      
       error={reasonError}
      />
      <FileUploadComponent file={file} setFile={
        (file) => {
          setFile(file);
          setFileError('');
        }
      } 
      error={fileError}
      />
      <Button 
        text={'Request Excused Absence'} 
        onPress={handleSubmit}
        style={styles.buttonContainer}
        />
    </MainLayout>
  );
};


export default ExcuseAttendanceDetailScreen;
