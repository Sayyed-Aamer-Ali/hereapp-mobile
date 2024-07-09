import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import { Icons } from '../../../assets';
import { CommonStyles, UtilityMethods, Validator } from '../../../utility';
import { Button, CustomizedInput, ScreenWrapper } from '../../../components';

const SignUp = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [studentId, setStudentId] = useState("");
  let [error, setError] = useState({});


  const handleChangeEmail = (text) => {

    let validateEmail = Validator( "email",text,);

    setError({...error,email:null});

    setEmail(text);

    if (validateEmail=="") {
       setError({...error,studentId:null});
       const ExtractID = email.split("@");
        setStudentId(ExtractID[0]);
    }

  




  }
  const onPressRegister = () => {

  let error={}

  let validateEmail = Validator( "email",email,);
  let validatePassword = Validator( "password",password,);

  if (email=="")

    {
      error["email"]="Email is required"
    }

    if (studentId=="")
    {
      error["studentId"]="Student ID is required"
    }
    if (password=="")
    {
      error["password"]="Password is required"
    }
    if (validateEmail!=""&&email!="")
    {
      error["email"]=validateEmail
    }
    if (validatePassword!=""&&password!="")
    {
      error["password"]=validatePassword
    }



   setError(error);

   if (Object.keys(error).length==0)
   {
      navigation.goBack();
     
   }



  }

  const handleFieldChange = (field,text) => {
    setError({...error,[field]:null});
   

    if (field=="password")
    {
      setPassword(text);
    }
    if (field=="studentId")
    {
      setStudentId(text);
    }

  }

  return (
    <View style={styles.cont}>
     <ScreenWrapper>
     <View style={{alignSelf:"center"}} >
    <Icons.Login width={UtilityMethods.wp(80)}
     height={UtilityMethods.wp(70)}
    />

    </View>
 <CustomizedInput
   
     type={"email"}
      value={email}
      placeholder={"Email"}
      onChangeText={(text) => handleChangeEmail(text)}
      Error={error.email?error.email:null}
    />
<CustomizedInput
  type={"text"}
  value={studentId}
  placeholder={"Student ID"}
  onChangeText={(text) => handleFieldChange("studentId",text)}
  Error={error.studentId?error.studentId:null}
/>

    <CustomizedInput
      type={"password"}
      value={password}
      placeholder={"Password"}
      onChangeText={(text) => 

        handleFieldChange("password",text)
      }
      Error={error.password?error.password:null}

    />

     <Button
      text={"Register"}
      onPress={() => onPressRegister()}
      style={{marginTop:UtilityMethods.hp(2)}}


    />

     <View style={[CommonStyles.ROW_VIEW,styles.linkView]}>
      <Text style={styles.linkText}>Already have an account?</Text>
      <TouchableOpacity onPress={() => {
        navigation.goBack();
      }}>
        <Text style={[styles.linkText,CommonStyles.BOLD]}>
          Login
        </Text>
      </TouchableOpacity>
     </View>
   

     </ScreenWrapper>
   
    </View>
  );
}

export default SignUp;
