import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Platform } from 'react-native';


import styles from './styles';
import { Colors, Fonts, Icons, Images } from '../../../assets';
import { CommonStyles, Constants, FontSize, UtilityMethods, Validator } from '../../../utility';
import { Button, CustomizedInput, Header, MainLayout, ScreenWrapper } from '../../../components';
import Routes from '../../../navigation/Routes';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../redux/Reducers/AuthReducer';

const Login = ({navigation,route}) => {

  const userType = route.params?.selectedUser;
  const [email, setEmail] = useState({
    inputType:"text",
    title:"Email",
    value:"",
    type:"email",
    error:"",
    placeholder:"Enter Email Address",

  });
  const [password, setPassword] = useState({
    inputType:"text",
    title:"Password",
    value:"",
    type:"password",
    error:"",
    placeholder:"Enter Password",
  });

  const [rememberMe, setRememberMe] = useState({
    inputType:"checkbox",
    title:"Remember Me",
    value:false,
    type:"checkbox",
    error:"",
  });
  const [error, setError] = useState({});
  const dispatch = useDispatch();


  const onPressDontAccount = () => {
    navigation.navigate(Routes.SIGNUP);

  }

  const onPressLogin = () => {

    let error = {}

    let emailValidate = Validator("email", email.value);
    let passwordValidate = Validator("password", password.value)

    if (email.value == "") {
      setEmail({...email, error:"Email is required"})
      error["email"]="Email is required"
    }
    if (password.value == "") {
      setPassword({...password, error:"Password is required"})
      error["password"]="Password is required"
    }
    

    setError(error);

    if(email.value!=""&&emailValidate)
      {
        setEmail({...email, error:emailValidate})
        error["email"]=emailValidate
      }

    if(password.value!=""&&passwordValidate)
      {
        setPassword({...password, error:passwordValidate})
        error["password"]=passwordValidate
      }

      setError(error);

    if (Object.keys(error).length == 0) {

      const user = {
        email: email,
        password: password,
        fullName:"John Doe",
        isLogin:true ,
        userType:userType,
        ProfileImage:Constants.DummyPicture
      }
      dispatch(setUser(user));


    }

    

   

  }

  return (
    <MainLayout>
     <Header title={"Sign In"} />

      <ScreenWrapper
      style={styles.cont}
      >
        <Image style={styles.logo} source={Images.LOGO} />

        <View style={styles.inPutCont}>

         <CustomizedInput
          fieldInfo={email}
          onChange={(text) => {
            setEmail({...email, value:text, error:""})
          }}
        />
        <CustomizedInput
          fieldInfo={password}
          onChange={(text) => {
            setPassword({...password, value:text, error:""})
          }}
        />

        <View style={styles.rowCont}> 
         <View style={CommonStyles.ROW_VIEW}>

          <CustomizedInput
          fieldInfo={rememberMe}
          onChange={(text) => {
            
            setRememberMe({...rememberMe, value:text})
          }}
        />

        <Text style={styles.regText}>Remember Me</Text>
         </View>
         <TouchableOpacity
         onPress={() => navigation.navigate(Routes.FORGET_PASSWORD)}
         >

         <Text style={[styles.regText,{
          color:Colors.RED,
          fontFamily:Fonts.MEDIUM,
          marginTop:Platform.OS=="android"?UtilityMethods.hp(0.7):0,
         }]}>
            Forgot Password?
         </Text>
         </TouchableOpacity>

        </View>
        </View>
         <Button
          text={"Sign In"}
          style={{
            marginTop:UtilityMethods.hp(4)
          
          }}
          onPress={() => onPressLogin()}
        />
        {userType!="Instructor"?
        <View style={styles.LinkedView}>
          <Text style={[styles.regText,{
           fontSize:FontSize.VALUE(16)          
          }]}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => onPressDontAccount()}>
            <Text style={[styles.regText,{
              color:Colors.RED,
              fontSize:FontSize.VALUE(16),
            }]}>Register Now
            </Text>
          </TouchableOpacity>
        </View>
        :null}
        </ScreenWrapper>
   
    </MainLayout>
  );
}

export default Login;
