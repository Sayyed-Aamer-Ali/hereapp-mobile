import React, { useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { Button, Header, ImagePicker, MainLayout, ScreenWrapper } from '../../../components';
import styles from './styles';
import { CommonStyles, Constants } from '../../../utility';
import Icon from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { Colors, Icons } from '../../../assets';
import { setUser } from '../../../redux/Reducers/AuthReducer';
import UserDetails from '../../../components/UserDetail';
import Routes from '../../../navigation/Routes';

const Profile = ({ navigation }) => {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();


  const [profileImage, setProfileImage] = useState({
    inputType: "image",
    title: user?.email,
    value: "",
    type: "image",
    error: "",
    placeholder: "Upload Profile Image",
    value: user?.ProfileImage ?? Constants.letImagePlaceholder,
    atEdit: true
  });


  console.log(user)

  const handleProfileAPI = (path) => {
    dispatch(setUser({ ...user, ProfileImage: path }));
  }

  const handleNavigation = (path) => {
    navigation.navigate(path);
  }

  return (
    <MainLayout>
      <Header title="Profile"
        showBackButton={false}
        DrawerHeader={true} />


      <ScreenWrapper style={[CommonStyles.BODY, styles.cont]}>

        <ImagePicker
          filedInfo={profileImage}
          onChnage={(path) => {
            setProfileImage({
              ...profileImage, value: path,
              error: ""
            })
            handleProfileAPI(path)
          }}
        />

        <UserDetails userData={user} />


        <View style={styles.buttonContainer}>

          <Button
            text={"Edit Profile"}
            onPress={() => handleNavigation(Routes.EDIT_PROFILE)}

          />
          <Button
            text={"Change Password"}
            style={styles.changePassowrd}
            textStyle={styles.changePassowrdText}
            onPress={() => handleNavigation(Routes.CHANGE_PASSWORD)}
          />
        </View>

      </ScreenWrapper>
    </MainLayout>
  );
}

export default Profile;
