import React, {useState} from 'react';
import {
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {DrawerActions} from '@react-navigation/native';
import {FlatList} from 'react-native-gesture-handler';
import {Icons} from '../../../assets';
import {resetAuth, setUser} from '../../../redux/Reducers/AuthReducer';
import {Constants} from '../../../utility';
import styles from './styles';
import Routes from '../../../navigation/Routes';
import {FastImageComponent, LogoutModal} from '../../../components';
import axiosWrapper from '../../../services/AxiosWrapper';
import {API_URLS} from '../../../services/apiPathList';
import {LoaderModal} from '../../../components/LoaderModal';

const SliderScreen = ({navigation}) => {
  const dispatch = useDispatch();
  let user = useSelector(state => state.auth.user);
  const [modalVisible, setModalVisible] = useState(false);
  const token = useSelector(state => state.auth.token);
  const [loader, setLoader] = useState(false);

  const handleLogout = async () => {
    setLoader(true);
    let payload = {
      isLogin: false,
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
      onPressLogout();
      setModalVisible(false);
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoader(false);
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const onPressLogout = () => {
    navigation.dispatch(DrawerActions.closeDrawer());
    setTimeout(() => {
      dispatch(resetAuth());
    }, 500);
  };

  const handleNavigation = path => {
    navigation.dispatch(DrawerActions.closeDrawer());

    setTimeout(() => {
      navigation.navigate(path);
    }, 200);
  };

  return (
    <View style={styles.cont}>
      <LoaderModal loading={loader} />
      <View style={styles.headerCont}>
        <Pressable
          style={styles.ImageCont}
          onPress={() => handleNavigation(Routes.PROFILE)}>
          <FastImageComponent
            style={styles.imageView}
            source={{
              uri: user?.profilePicture || Constants.letImagePlaceholder,
            }}
          />
        </Pressable>
        <Text style={styles.titleText}>
          {user?.firstName} {user?.lastName}
        </Text>
      </View>

      <View style={styles.body}>
        <FlatList
          data={Constants.DrawerItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={styles.itemCont}
              onPress={() => handleNavigation(item.route)}>
              <View style={styles.iconCont}>{item.icon}</View>
              <Text style={styles.itemText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />

        <TouchableOpacity
          style={styles.logoutCont}
          onPress={() => setModalVisible(true)}>
          <View style={styles.iconCont}>
            <Icons.SignOut />
          </View>
          <Text style={styles.itemText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <LogoutModal
        visible={modalVisible}
        onConfirm={handleLogout}
        onCancel={handleCancel}
      />
    </View>
  );
};

export default SliderScreen;
