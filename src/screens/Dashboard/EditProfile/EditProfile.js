import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import styles from './styles';
import { Colors, Icons } from '../../../assets';
import { UtilityMethods, Validator } from '../../../utility';
import { Button, CustomizedInput, Header, MainLayout, ScreenWrapper, ImagePicker } from '../../../components';
import Routes from '../../../navigation/Routes';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../../redux/Reducers/AuthReducer';

const EditProfile = ({ navigation }) => {
  const user = useSelector(state => state.auth.user);

  const [fullName, setFullName] = useState({
    inputType: "text",
    title: "Full Name",
    value: user.fullName,
    type: "text",
    error: "",
    placeholder: "Enter Full Name",
    leftIcon: <Icons.User />
  });

  const [phoneNumber, setPhoneNumber] = useState({
    inputType: "text",
    title: "Phone",
    value: user.phoneNumber,
    type: "text",
    error: "",
    placeholder: "Enter Phone Number",
    leftIcon: <Icons.Phone />
  });

  const [address, setAddress] = useState({
    inputType: "text",
    title: "Address",
    value: user.address,
    type: "text",
    error: "",
    placeholder: "Enter Full Address",
    leftIcon: <Icons.User />
  });

  const [profileImage, setProfileImage] = useState({
    inputType: "image",
    title: "Profile Image",
    value: user?.ProfileImage ?? '',
    type: "image",
    error: "",
    placeholder: "Upload Profile Image"
  });

  const [error, setError] = useState({});
  const dispatch = useDispatch();

  const onPressUpdate = () => {
    let error = {};

    if (fullName.value === "") {
      setFullName({ ...fullName, error: "Name is required" });
      error["fullName"] = "Name is required";
    }

    if (phoneNumber.value === "") {
      setPhoneNumber({ ...phoneNumber, error: "Phone Number is required" });
      error["phoneNumber"] = "Phone Number is required";
    }

    if (address.value === "") {
      setAddress({ ...address, error: "Address is required" });
      error["address"] = "Address is required";
    }

    if (profileImage.value === "") {
      setProfileImage({ ...profileImage, error: "Profile Image is required" });
      error["profileImage"] = "Profile Image is required";
    }

    setError(error);

    if (Object.keys(error).length === 0) {
      let updatedUser = {
        ...user,
        fullName: fullName.value,
        phoneNumber: phoneNumber.value,
        address: address.value,
        ProfileImage: profileImage.value,
      };

      // Dispatch updated user information here
      dispatch(setUser(updatedUser));

      Alert.alert("Success", "Profile update successfully",
        [
          {
            text:'Ok',
            onPress: () => navigation.goBack()
          }
        ]
      )

    }
  };

  return (
    <MainLayout>
      <Header title={"Edit Profile"} />
      <ScreenWrapper style={styles.cont}>
        <ImagePicker
          filedInfo={profileImage}
          onChange={(path) => {
            setProfileImage({
              ...profileImage, value: path,
              error: ""
            });
          }}
        />
        <View style={styles.inPutCont}>
          <CustomizedInput
            fieldInfo={fullName}
            onChange={(text) => {
              setFullName({ ...fullName, value: text, error: "" });
            }}
          />
          <CustomizedInput
            fieldInfo={phoneNumber}
            onChange={(text) => {
              setPhoneNumber({ ...phoneNumber, value: text, error: "" });
            }}
            keyboardType="number-pad"
          />
          <CustomizedInput
            fieldInfo={address}
            onChange={(text) => {
              setAddress({ ...address, value: text, error: "" });
            }}
          />
        </View>
        

        <View style={styles.buttonContainer}>

        <Button
          text={"Save Changes"}
          style={{
            marginTop: UtilityMethods.hp(4)
          }}
          onPress={() => onPressUpdate()}
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

export default EditProfile;
