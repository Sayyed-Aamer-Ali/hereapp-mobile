import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';


import styles from './styles';
import { Icons } from '../../../assets';
import { CommonStyles, UtilityMethods, Validator } from '../../../utility';
import { Button, CustomizedInput, ScreenWrapper } from '../../../components';
import Routes from '../../../navigation/Routes';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../redux/Reducers/AuthReducer';

const Login = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const dispatch = useDispatch();


  const onPressDontAccount = () => {
    navigation.navigate(Routes.SIGNUP);

  }

  const onPressLogin = () => {

    let error = {}

    let emailValidate = Validator("email", email);
    let passwordValidate = Validator("password", password)

    if (email == "") {
      error["email"] = "Email is required"
    }
    if (password == "") {
      error["password"] = "Password is required"
    }
    

    setError(error);

    if(email!=""&&emailValidate)
      {
        error["email"]=emailValidate
      }

    if(password!=""&&passwordValidate)
      {
        error["password"]=passwordValidate
      }

      setError(error);

    if (Object.keys(error).length == 0) {

      const user = {
        email: email,
        password: password,
        isLogin:true 
      }
      dispatch(setUser(user));


    }

    

   

  }

  return (
    <View style={styles.cont}>
     <ScreenWrapper
     
     >
     <View style={{alignSelf:"center"}} >
    <Icons.Login width={UtilityMethods.wp(80)}
     height={UtilityMethods.wp(70)}
    />

    </View>

    <View style={styles.body}>
    <CustomizedInput
   
     type={"email"}
      value={email}
      placeholder={"Email"}
      onChangeText={(text) => {
        setEmail(text);
        setError({...error,email:null});
      
      }}
      Error={error.email?error.email:null}
    />

    <CustomizedInput
      type={"password"}
      value={password}
      placeholder={"Password"}
      onChangeText={(text) => setPassword(text)}
      Error={error.password?error.password:null}

    />

     <Button
      text={"Login"}
      onPress={() => onPressLogin()}
   


    />
    </View>

     <View style={[CommonStyles.ROW_VIEW,styles.linkView]}>
      <Text style={styles.linkText}>Don't have an account?</Text>
      <TouchableOpacity onPress={() => onPressDontAccount()}>
        <Text style={[styles.linkText,CommonStyles.BOLD]}>Sign Up</Text>
      </TouchableOpacity>
     </View>
   

     </ScreenWrapper>
   
    </View>
  );
}

export default Login;
