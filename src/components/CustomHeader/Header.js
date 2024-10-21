import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CommonStyles, FontSize, UtilityMethods } from '../../utility';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors, Fonts, Icons } from '../../assets';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import Routes from '../../navigation/Routes';
import NotificationsIcon from '../NotificationsIcon';
import { useDispatch, useSelector } from 'react-redux';
import axiosWrapper from '../../services/AxiosWrapper';
import { API_URLS } from '../../services/apiPathList';
import { setTotalNotification } from '../../redux/Reducers/AuthReducer';

const Header = ({
  title,
  showBackButton = true,
  onPressLeft,
  leftIcon,
  rightcontent,
  DrawerHeader = false,
  isLogout = false,
  logoutOnPress,
  rightIcons = true,
  ...props

}) => {
  const navigation = useNavigation();
  const totalNotification = useSelector(state => state.auth.totalNotification)
  const token = useSelector(state => state.auth.token)
  const dispatch = useDispatch(); 

  const onPressNotificaiton = () => {
    navigation.navigate(Routes.NOTIFICATION_SCREEN)
  }

  useEffect(() => {
    getNotifications()
  }, [])

  const getNotifications = async () => {
    try {
      let response = await axiosWrapper('GET', API_URLS.GET_NOTIFICATION, null, token)
      let notificaitonsList = response?.data;
      let notificaitonCount = notificaitonsList?.filter((data) => !data?.isRead)
      dispatch(setTotalNotification(notificaitonCount.length))
    } catch (error) {
      console.log(error)
    }
  }


   useEffect(() => {
    const unsubscribe = UtilityMethods.getForegroundMessage((res)=>{
      getNotifications()
    })
    return unsubscribe;
  }, []);


  return (
    <View style={styles.headerCont}>
      <View style={CommonStyles.ROW_VIEW}>

        {DrawerHeader &&
          <TouchableOpacity style={styles.icon}
            onPress={() =>
              navigation.dispatch(DrawerActions.openDrawer())
            }
          >
            <Icons.List />
          </TouchableOpacity>
        }

        {leftIcon &&
          <TouchableOpacity
            style={styles.icon}
            onPress={onPressLeft}
          >
            {leftIcon}
          </TouchableOpacity>
        }
        {showBackButton &&
          <TouchableOpacity
            style={styles.icon}
            onPress={props.onPressIcon || (() => navigation.goBack())}
          >
            <Icon name="arrow-back" size={25} color={
              Colors.ICON_BLACK
            } />

          </TouchableOpacity>
        }

        <Text style={styles.headerText}>
          {title}
        </Text>
      </View>

      {rightcontent &&
        <View>
          {rightcontent}

        </View>
      }

      <View style={styles.rightIcons}>
        {rightIcons &&
          <TouchableOpacity onPress={onPressNotificaiton}>
            <NotificationsIcon notifications={totalNotification} />
          </TouchableOpacity>}
        {isLogout &&
          <TouchableOpacity onPress={logoutOnPress}>
            <Icons.logoutIcon2 />
          </TouchableOpacity>}
      </View>

    </View>
  );
}

export default Header;

const styles = StyleSheet.create({

  headerCont: {
    width: "100%",
    // height: UtilityMethods.hp(8),
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    ...CommonStyles.PADDING_HORIZONTAL
  },
  icon: {
    width: UtilityMethods.wp(12),
  },
  headerText: {
    color: Colors.ICON_BLACK,
    fontSize: FontSize.VALUE(18),
    fontFamily: Fonts.SEMI_BOLD,
  },
  rightIcons: {
    flexDirection: "row",
    alignItems: 'center',
    columnGap: UtilityMethods.wp(4)
  }

});
