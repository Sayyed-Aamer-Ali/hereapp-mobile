// TermsAndConditions.js
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from 'react-native';
import {Colors, Icons} from '../../assets';
import {UtilityMethods} from '../../utility';
import styles from './styles';
import {Header, MainLayout} from '../../components';
import axiosWrapper from '../../services/AxiosWrapper';
import {API_URLS} from '../../services/apiPathList';
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from '../../redux/Reducers/AuthReducer';

const SettingsScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const token = useSelector(state => state.auth.token);
  const fcmToken = useSelector(state => state.auth.fcmToken);
  let [loader, setLoader] = useState(false);

  const [emailNotification, setEmailNotification] = useState(
    user?.isEmailNotificationEnabled,
  );
  const [inAppNotification, setInAppNotification] = useState(
    user?.isInAppNotificationEnabled,
  );

  const toggleEmailNotification = () =>
    setEmailNotification(previousState => !previousState);
  const toggleInAppNotification = () =>
    setInAppNotification(previousState => !previousState);

  const handleEmailNotificaiton = async () => {
    setLoader(true);
    let payload = {
      isEmailNotificationEnabled: !emailNotification,
    };
    try {
      let response = await axiosWrapper(
        'PATCH',
        API_URLS.EDIT_PROFILE,
        payload,
        token,
        false,
        'json',
        false,
      );
      dispatch(
        setUser({...user, isEmailNotificationEnabled: !emailNotification}),
      );
      toggleEmailNotification();
    } catch (error) {
    } finally {
      setLoader(false);
    }
  };

  const handlePushNotificaiton = async res => {
    setLoader(true);
    let payload = {
      isInAppNotificationEnabled: !inAppNotification,
    };
    if (!fcmToken && fcmToken !== res) {
      payload.fcmToken = res;
    }

    try {
      let response = await axiosWrapper(
        'PATCH',
        API_URLS.EDIT_PROFILE,
        payload,
        token,
        false,
        'json',
        false,
      );
      dispatch(
        setUser({...user, isInAppNotificationEnabled: !inAppNotification}),
      );
      toggleInAppNotification();
    } catch (error) {
    } finally {
      setLoader(false);
    }
  };

  const askForNotificaitonPermission = () => {
    UtilityMethods.requestPermission(res => {
      if (res) handlePushNotificaiton(res);
    });
  };

  return (
    <MainLayout loader={loader}>
      <Header
        title={'Settings'}
        showBackButton={true}
        DrawerHeader={false}
        rightIcons={false}
      />

      <View style={styles.container}>
        <View style={styles.notificationItem}>
          <Text style={styles.label}>Email Notification</Text>
          <Switch
            value={emailNotification}
            onValueChange={handleEmailNotificaiton}
            trackColor={{false: Colors.GRAY, true: Colors.Switch}}
            thumbColor={Colors.WHITE}
            style={styles.switch}
          />
        </View>
        <View style={styles.notificationItem}>
          <Text style={styles.label}>In App Push Notification</Text>
          <Switch
            value={inAppNotification}
            onValueChange={askForNotificaitonPermission}
            trackColor={{false: Colors.GRAY, true: Colors.Switch}}
            thumbColor={Colors.WHITE}
            style={styles.switch}
          />
        </View>
      </View>
    </MainLayout>
  );
};

export default SettingsScreen;
