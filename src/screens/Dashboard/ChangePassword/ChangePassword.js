// import React, { useState } from 'react';
// import { Alert, View } from 'react-native';
// import styles from './styles';
// import { Colors, Icons } from '../../../assets';
// import { UtilityMethods, Validator } from '../../../utility';
// import { Button, CustomizedInput, Header, MainLayout, ScreenWrapper, ImagePicker } from '../../../components';
// import Routes from '../../../navigation/Routes';
// import { useDispatch, useSelector } from 'react-redux';
// import { setUser } from '../../../redux/Reducers/AuthReducer';

// const ChangePassword = ({ navigation }) => {
//   const user = useSelector(state => state.auth.user);

//   const [password, setPassword] = useState({
//     inputType:"text",
//     title:"Old Password",
//     value:"",
//     type:"password",
//     error:"",
//     placeholder:"Enter Password",
//   });

//   const [fullName, setFullName] = useState({
//     inputType: "text",
//     title: "Full Name",
//     value: user.fullName,
//     type: "text",
//     error: "",
//     placeholder: "Enter Full Name",
//     leftIcon: <Icons.User />
//   });

//   const [phoneNumber, setPhoneNumber] = useState({
//     inputType: "text",
//     title: "Phone",
//     value: user.phoneNumber,
//     type: "text",
//     error: "",
//     placeholder: "Enter Phone Number",
//     leftIcon: <Icons.Phone />
//   });

//   const [address, setAddress] = useState({
//     inputType: "text",
//     title: "Address",
//     value: user.address,
//     type: "text",
//     error: "",
//     placeholder: "Enter Full Address",
//     leftIcon: <Icons.User />
//   });

//   const [profileImage, setProfileImage] = useState({
//     inputType: "image",
//     title: "Profile Image",
//     value: user?.ProfileImage ?? '',
//     type: "image",
//     error: "",
//     placeholder: "Upload Profile Image"
//   });

//   const [error, setError] = useState({});
//   const dispatch = useDispatch();

//   const onPressLogin = () => {
//     let error = {};

//     let passwordValidate = Validator("password", password.value)

//     if (password.value == "") {
//       setPassword({...password, error:"Password is required"})
//       error["password"]="Password is required"
//     }

//     if (fullName.value === "") {
//       setFullName({ ...fullName, error: "Name is required" });
//       error["fullName"] = "Name is required";
//     }

//     if (phoneNumber.value === "") {
//       setPhoneNumber({ ...phoneNumber, error: "Phone Number is required" });
//       error["phoneNumber"] = "Phone Number is required";
//     }

//     if (address.value === "") {
//       setAddress({ ...address, error: "Address is required" });
//       error["address"] = "Address is required";
//     }

//     if (profileImage.value === "") {
//       setProfileImage({ ...profileImage, error: "Profile Image is required" });
//       error["profileImage"] = "Profile Image is required";
//     }

//     if(password.value!=""&&passwordValidate)
//       {
//         setPassword({...password, error:passwordValidate})
//         error["password"]=passwordValidate
//       }

//     setError(error);

//     if (Object.keys(error).length === 0) {
//       let updatedUser = {
//         fullName: fullName.value,
//         phoneNumber: phoneNumber.value,
//         address: address.value,
//         ProfileImage: profileImage.value,
//       };

//       // Dispatch updated user information here
//       dispatch(setUser({...user, ...updatedUser}));

//       Alert.alert("Success", "Profile update successfully",
//         [
//           {
//             text:'Ok',
//             onPress: () => navigation.goBack()
//           }
//         ]
//       )

//     }
//   };

//   return (
//     <MainLayout>
//       <Header title={"Change Password"} />
//       <ScreenWrapper style={styles.cont}>

//       <CustomizedInput
//           fieldInfo={password}
//           onChange={(text) => {
//             setPassword({...password, value:text, error:""})
//           }}
//         />

        

//         <View style={styles.buttonContainer}>

//         <Button
//           text={"Save Changes"}
//           style={{
//             marginTop: UtilityMethods.hp(4)
//           }}
//           onPress={() => onPressLogin()}
//         />
//           <Button
//             text={"Discard"}
//             style={styles.changePassowrd}
//             textStyle={styles.changePassowrdText}
//             onPress={() => navigation.goBack()}
//           />
//         </View>
//       </ScreenWrapper>
//     </MainLayout>
//   );
// }

// export default ChangePassword;





import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import styles from './styles';
import { Icons } from '../../../assets';
import { UtilityMethods, Validator } from '../../../utility';
import { Button, CustomizedInput, Header, MainLayout, ScreenWrapper } from '../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../../redux/Reducers/AuthReducer';

const ChangePassword = ({ navigation }) => {
  const user = useSelector(state => state.auth.user);

  const [oldPassword, setOldPassword] = useState({
    inputType: "text",
    title: "Old Password",
    value: "",
    type: "password",
    error: "",
    placeholder: "Enter Old Password",
  });

  const [newPassword, setNewPassword] = useState({
    inputType: "text",
    title: "New Password",
    value: "",
    type: "password",
    error: "",
    placeholder: "Enter New Password",
  });

  const [confirmPassword, setConfirmPassword] = useState({
    inputType: "text",
    title: "Confirm New Password",
    value: "",
    type: "password",
    error: "",
    placeholder: "Confirm New Password",
  });

  const [error, setError] = useState({});
  const dispatch = useDispatch();

  const onPressSaveChanges = () => {
    let error = {};

    let oldPasswordValidate = Validator("password", oldPassword.value);
    let newPasswordValidate = Validator("password", newPassword.value);

    if (oldPassword.value === "") {
      setOldPassword({ ...oldPassword, error: "Old Password is required" });
      error["oldPassword"] = "Old Password is required";
    }

    if (newPassword.value === "") {
      setNewPassword({ ...newPassword, error: "New Password is required" });
      error["newPassword"] = "New Password is required";
    }

    if (confirmPassword.value === "") {
      setConfirmPassword({ ...confirmPassword, error: "Confirm Password is required" });
      error["confirmPassword"] = "Confirm Password is required";
    }

    if (newPassword.value !== confirmPassword.value) {
      setConfirmPassword({ ...confirmPassword, error: "Passwords do not match" });
      error["confirmPassword"] = "Passwords do not match";
    }

    if (oldPassword.value !== "" && oldPasswordValidate) {
      setOldPassword({ ...oldPassword, error: oldPasswordValidate });
      error["oldPassword"] = oldPasswordValidate;
    }

    if (newPassword.value !== "" && newPasswordValidate) {
      setNewPassword({ ...newPassword, error: newPasswordValidate });
      error["newPassword"] = newPasswordValidate;
    }

    setError(error);

    if (Object.keys(error).length === 0) {
      let updatedUser = {
        ...user,
        password: newPassword.value,
      };

      // Dispatch updated user information here
      dispatch(setUser(updatedUser));

      Alert.alert("Success", "Password updated successfully", [
        {
          text: 'Ok',
          onPress: () => navigation.goBack(),
        }
      ]);
    }
  };

  return (
    <MainLayout>
      <Header title={"Change Password"} />
      <ScreenWrapper style={styles.cont}>


      <View style={styles.inPutCont}>
        <CustomizedInput
          fieldInfo={oldPassword}
          onChange={(text) => {
            setOldPassword({ ...oldPassword, value: text, error: "" });
          }}
        />
        <CustomizedInput
          fieldInfo={newPassword}
          onChange={(text) => {
            setNewPassword({ ...newPassword, value: text, error: "" });
          }}
        />
        <CustomizedInput
          fieldInfo={confirmPassword}
          onChange={(text) => {
            setConfirmPassword({ ...confirmPassword, value: text, error: "" });
          }}
        />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            text={"Save Changes"}
            style={{
              marginTop: UtilityMethods.hp(4)
            }}
            onPress={() => onPressSaveChanges()}
          />
          <Button
            text={"Discard"}
            style={styles.changePassowrd}
            textStyle={styles.changePassowrdText}
            onPress={() => navigation.goBack()}
          />
        </View>
      </ScreenWrapper>
    </MainLayout>
  );
}

export default ChangePassword;
