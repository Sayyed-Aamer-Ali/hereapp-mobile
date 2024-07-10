import React, { useState } from 'react';
import { Image, Text, View } from 'react-native';


import { Images } from '../../../assets';
import { Button, CustomizedInput, Header, MainLayout, ScreenWrapper } from '../../../components';
import { UtilityMethods, Validator } from '../../../utility';
import styles from './styles';

const ForgetPassword = ({navigation,route}) => {

let user = route?.params?.user; 
  
   
const [email, setEmail] = useState({
  inputType:"text",
  title:"Email",
  value:"",
  type:"email",
  error:"",
  placeholder:"Enter Email Address",

});


const onPressResetPassword = () => {

  let error = {}

  let emailValidate = Validator("email", email.value);

  if (email.value == "") {
    setEmail({...email, error:"Email is required"})
    error["email"]="Email is required"
  }

  if(email.value!=""&&emailValidate)
    {
      setEmail({...email, error:emailValidate})
      error["email"]=emailValidate
    }

    if(Object.keys(error).length==0)
    {
       navigation.goBack()
    }
    

  

}







 
  return (
    <MainLayout>
     <Header title={"Forgot Password"} />

      <ScreenWrapper
      style={styles.cont}
      contentContainerStyle={styles.contentContainerStyle}
      >
        <Image style={styles.logo} source={Images.LOGO} />

        <View style={styles.inPutCont}>
       
         <Text style={styles.mainText}>
         Request Password Reset
         </Text>

         <Text style={styles.regText}>
         {"Please enter your registered Email address to send a Password Reset Link"}
       
         </Text>
         
          
          
        
        </View>

      
        <View style={{height:UtilityMethods.hp(4)}}/>
      
        <CustomizedInput
           fieldInfo={email}
           onChange={(value) => {
              setEmail({...email, value:value, error:""})
            
           }}
          />


         <Button
          text={"Reset Password"}
          style={{
            marginTop:UtilityMethods.hp(4)
          
          }}
          onPress={() => {
            onPressResetPassword()
          }}
       
        />

      
      
        </ScreenWrapper>
   
    </MainLayout>
  );
}

export default ForgetPassword;
