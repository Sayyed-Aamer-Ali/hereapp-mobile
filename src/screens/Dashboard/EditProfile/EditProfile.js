import React, { useState } from 'react';
import { ImageBackground, Text, View ,

  TouchableOpacity,
  Alert
} from 'react-native';
import { AlertWithTwoButtons, Button, CustomizedInput, Header, ScreenWrapper ,} from '../../../components';
import Icon from 'react-native-vector-icons/AntDesign';
import Routes from '../../../navigation/Routes';
import { CommonStyles, Constants, UtilityMethods, Validator } from '../../../utility';
import styles from './styles';
import { useSelector } from 'react-redux';

import { Colors } from '../../../assets';
import AlertService from '../../../services/AlertService';

const EditProfile = ({navigation}) => {

  const user = useSelector(state => state.auth.user);
  const [image, setImage] = useState(user?.profilePicture??Constants.letImagePlaceholder);
  const [email, setEmail] = useState(user?.email);
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [error, setError] = useState();

  const onPressCamera = () => {
   Alert.alert("Choose Image","Select Image from",[
      {text:"Camera",onPress:()=>{
        openCamera()

      }},
      {text:"Gallery",onPress:()=>{
        openGallery()
      }},
      {text:"Cancel",onPress:()=>{}}
    ])
    
 

  }

  const openCamera = () => {
    UtilityMethods.selectImage("camera", (response) => {
      console.log(response)
      setImage(response?.path)

     


  },false
)
}


  const openGallery= () => {
    UtilityMethods.selectImage("gallery", (response) => {
      setImage(response.path)
    },false
    )

  }

  const handlePassword = (text,type) => {


    if(type=="password"){
      setPassword(text)
      setError({...error,password:null})
    }else if(type=="newPassword"){
      setNewPassword(text)
      setError({...error,newPassword:null})
    }else if(type=="confirmPassword"){
      setConfirmPassword(text)
      setError({...error,confirmPassword:null})
    }
  }

  const onPressUpdate = () => {
    const newError = {}

    const passwordValidte =Validator("password",password);
    const newPasswordValidte =Validator("password",newPassword);
    const confirmPasswordValidte =Validator("confirmPassword",newPassword, confirmPassword); ;

    if(passwordValidte &&password!="" ){
      newError["password"]=passwordValidte

    }
    if(newPasswordValidte &&newPassword!="" ){
      newError["newPassword"]=newPasswordValidte

    }
    if(confirmPasswordValidte &&confirmPassword!="" ){
      newError["confirmPassword"]=confirmPasswordValidte

    }

    setError(newError)



    

    if(Object.keys(newError)){
      AlertService.toastPrompt("profile updated successfully")
      navigation.goBack()
    }

  
  

    


  }



  return (
    <View style={CommonStyles.CONTAINER}>
    <Header
     title={"Edit Profile"}
    />
    <ScreenWrapper style={[CommonStyles.BODY,styles.cont]}>

      <ImageBackground  style={styles.roundView}
       source={{uri:image}}
      >
 


      </ImageBackground>
      <TouchableOpacity 
     style={styles.roundEditView}
     onPress={onPressCamera}
     >
        <Icon name="camerao" size={20} color={Colors.WHITE}/>

     </TouchableOpacity>

  <View style={styles.inputView}>
     <CustomizedInput
      placeholder={"Email"}
      value={email}
      onChangeText={(text)=>setEmail(text)}
      editable={false}
      />
      <CustomizedInput
      placeholder={"Current Password"}
      value={password}
      type={"password"}
      onChangeText={(text)=>handlePassword(text,"password")}
   
      Error={error?.password?error.password:null}
      />

      <CustomizedInput
      placeholder={"New Password"}
      value={newPassword}
      onChangeText={(text)=>
        handlePassword(text,"newPassword")
      }
      type={"password"}
   
      Error={error?.newPassword?error.newPassword:null}
      />
      <CustomizedInput
      placeholder={"Confirm Password"}
      value={confirmPassword}
      onChangeText={(text)=>
        handlePassword(text,"confirmPassword")
      }
      type={"password"}
      Error={error?.confirmPassword?error.confirmPassword:null}
      />
      <Button 
       text={"Update"}
       onPress={()=>{
        onPressUpdate()
       }}
       style={styles.button}
      />

  </View>


      




    
   
    </ScreenWrapper>
    </View>
  );
}

export default EditProfile;
