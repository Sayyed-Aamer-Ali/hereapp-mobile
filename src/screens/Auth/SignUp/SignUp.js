import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';


import styles from './styles';
import { Colors, Icons, Images } from '../../../assets';
import { CommonStyles, FontSize, UtilityMethods, Validator } from '../../../utility';
import { Button, CustomizedInput, Header, MainLayout, ScreenWrapper,ImagePicker } from '../../../components';
import Routes from '../../../navigation/Routes';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../redux/Reducers/AuthReducer';

const SignUp = ({navigation,route}) => {


  const [email, setEmail] = useState({
    inputType:"text",
    title:"Email",
    value:"",
    type:"email",
    error:"",
    placeholder:"Enter Email Address",

  });

  const [profileImage, setProfileImage] = useState({
    inputType:"image",
    title:"Profile Image",
    value:"",
    type:"image",
    error:"",
    placeholder:"Upload Profile Image",
    
  
  });

  const [fullName,setFullName] =useState({
    inputType:"text",
    title:"Full Name",
    value:"",
    type:"text",
    error:"",
    placeholder:"Enter Full Name",
    leftIcon:<Icons.User/>
  })

  const [phoneNumber,setPhoneNumber] =useState({
    inputType:"text",
    title:"Phone",
    value:"",
    type:"text",
    error:"",
    placeholder:"Enter Phone Number",
    leftIcon:<Icons.Phone/>
  })

  const [nedId,setNetId] =useState({
    inputType:"text",
    title:"NetID",
    value:"",
    type:"text",
    error:"",
    placeholder:"Enter NetID",
    leftIcon:<Icons.Email/>,
 
  })
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
  const [privacyPolicy, setPrivacyPolicy] = useState({
    inputType:"checkbox",
    title:"Remember Me",
    value:false,
    type:"checkbox",
    error:"",
  });
  const [error, setError] = useState({});
  const dispatch = useDispatch();


  const onPressDontAccount = () => {
    navigation.navigate(Routes.LOGIN);

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
    if(fullName.value=="")
      {
        setFullName({...fullName,error:"Name is required"})
        error["fullName"]="Name is required"
      }

    if(phoneNumber.value=="")
      {
        setPhoneNumber({...phoneNumber,error:"Phone Number is required"})
        error["phoneNumber"]="Phone Number is required"
      }

    if(nedId.value=="")
      {
        setNetId({...nedId,error:"NetID is required"})
        error["nedId"]="NetID is required"
      }

    if(profileImage.value=="")
      {
        setProfileImage({...profileImage,error:"Profile Image is required"})
        error["profileImage"]="Profile Image is required"
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


      let user = {
        email: email.value,
        password: password.value,
        fullName:fullName.value,
        phoneNumber:phoneNumber.value,
        netId:nedId.value,
        userType:"Student",
        ProfileImage:Constants.DummyPicture,
        isLogin:true,
        postalCode:'89000',
      }
       navigation.navigate(Routes.OTP_VERIFICATION,{
        user:user
       
         
      })


    }

    

   

  }

  return (
    <MainLayout>
     <Header title={"Sign Up"} />

      <ScreenWrapper
      style={styles.cont}
      >
          <ImagePicker
           filedInfo={profileImage}
           onChnage={(path)=>{
            setProfileImage({
              ...profileImage,value:path,
              error:""
            })
           }}
          />

        <View style={styles.inPutCont}>

        <CustomizedInput
          fieldInfo={fullName}
          onChange={(text) => {
            setFullName({...fullName, value:text, error:""})
          }}
        />

         <CustomizedInput
          fieldInfo={email}
          onChange={(text) => {
            setEmail({...email, value:text, error:""})

            let ExtractId = text.split("@")
            setNetId({...nedId, value:ExtractId[0], error:""})

          }}
        />
         <CustomizedInput
          fieldInfo={nedId}
          onChange={(text) => {
            setNetId({...nedId, value:text, error:""})
          }}
          editable={false}
        />
         <CustomizedInput
          fieldInfo={phoneNumber}
          onChange={(text) => {
            setPhoneNumber({...phoneNumber, value:text, error:""})
          }}
          keyboardType="number-pad"
          
        />
        <CustomizedInput
          fieldInfo={password}
          onChange={(text) => {
            setPassword({...password, value:text, error:""})
          }}
        />

        <View style={styles.rowCont}> 
        <CustomizedInput
          fieldInfo={rememberMe}
          onChange={(text) => {
            
            setRememberMe({...rememberMe, value:text})
          }}
        />

         <View style={[CommonStyles.ROW_VIEW]}>

          <Text style={styles.regText}>
          I agree to the
          </Text>
          <TouchableOpacity>
          <Text style={styles.underLineText}>
          terms & conditions.
          </Text>
          </TouchableOpacity>
         </View>

       </View>

       <View style={styles.rowCont}> 
        <CustomizedInput
          fieldInfo={privacyPolicy}
          onChange={(text) => {
            
            setPrivacyPolicy({...privacyPolicy, value:text})
          }}
        />

         <View style={[CommonStyles.ROW_VIEW]}>

          <Text style={styles.regText}>
          I agree to the
          </Text>
          <TouchableOpacity>
          <Text style={styles.underLineText}>
          privacy policy.
          </Text>
          </TouchableOpacity>
         </View>

       </View>
        </View>
         <Button
          text={"Sign In"}
          style={{
            marginTop:UtilityMethods.hp(4)
          
          }}
          onPress={() => onPressLogin()}
        />
       
        <View style={styles.LinkedView}>
          <Text style={[styles.regText,{
           fontSize:FontSize.VALUE(16)          
          }]}>Already have an account?</Text>
          <TouchableOpacity onPress={() => onPressDontAccount()}>
            <Text style={[styles.regText,{
              color:Colors.RED,
              fontSize:FontSize.VALUE(16),
            }]}>Login Now
            </Text>
          </TouchableOpacity>
        </View>

        
        <View style={{height:UtilityMethods.hp(3)}}/>
        </ScreenWrapper>
   
    </MainLayout>
  );
}

export default SignUp;
