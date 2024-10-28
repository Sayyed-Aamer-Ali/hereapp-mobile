// NotificationsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Button, MainLayout, NotificationCard, ScreenWrapper } from '../../components';
import { Colors, Fonts, Icons } from '../../assets';
import { UtilityMethods, FontSize } from '../../utility';
import { notifications } from '../../Data/DummyData';
import Icon from 'react-native-vector-icons/Ionicons';
import { API_URLS } from '../../services/apiPathList';
import axiosWrapper from '../../services/AxiosWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { setTotalNotification } from '../../redux/Reducers/AuthReducer';


const NotificationsScreen = ({ navigation }) => {
  const [loader, setLoader] = useState(false)
  const totalNotification = useSelector(state => state.auth.totalNotification)
  const token = useSelector(state => state.auth.token)
  const dispatch = useDispatch();

  const [allNotificaitons, setAllNotificaitons] = useState([])

  useEffect(() => {
    getNotifications()
  }, [])

  const getNotifications = async () => {
    try {
      setLoader(true)
      let response = await axiosWrapper('GET', API_URLS.GET_NOTIFICATION, null, token)
      let notificaitonsList = response?.data;
      setAllNotificaitons(notificaitonsList)
    } catch (error) {
    }
    finally {
      setLoader(false)
    }
  }

  const handleMarkNotifications = async (idsArray) => {
    if(idsArray.length === 0){
      return
    }
    
    let data = {
      notifications: idsArray
    }
    try {
      setLoader(true)
      let response = await axiosWrapper('POST', API_URLS.READ_NOTIFICATION, data, token)
      const updatedNotifications = allNotificaitons.map(notification => {
        if (idsArray.includes(notification._id)) {
            return { ...notification, isRead: true }; // Update isRead to true
        }
        return notification; // Return unchanged notification
    });
    
    setAllNotificaitons(updatedNotifications)
    dispatch(setTotalNotification(totalNotification - idsArray?.length))
    } catch (error) {
      
    }
    finally{
      setLoader(false)
    }
  }


  return (
    <MainLayout loader={loader} >
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.icon} onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={25} color={
              Colors.ICON_BLACK
            } />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Notifications</Text>
        </View>
        <TouchableOpacity 
          onPress={()=>handleMarkNotifications(allNotificaitons?.filter((data) => !data?.isRead)?.map((data)=> data._id))}
         >
          <Text style={styles.markAllRead}>Mark all as read</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={allNotificaitons}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <NotificationCard
            notification={item}
            onPress={() => handleMarkNotifications([item?._id])} />
        )}
        contentContainerStyle={styles.flatListContent}
      />

      {/* <Button
          text={"Back to Home"}
          LeftIcon={<Icons.ArrowBack />}
          style={styles.button}
          textStyle={styles.textStyle}
          onPress={() => navigation.goBack()}
        /> */}
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: UtilityMethods.hp(2),
    backgroundColor: Colors.WHITE,
  },
  headerLeft: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: FontSize.VALUE(18),
    fontFamily: Fonts.BOLD,
    color: Colors.BLACK,
    marginLeft: UtilityMethods.wp(2)
  },
  markAllRead: {
    fontSize: FontSize.VALUE(14),
    fontFamily: Fonts.REGULAR,
    color: Colors.BLACK,
  },
  flatListContent: {
    paddingHorizontal: UtilityMethods.wp(4),
  },
  button: {
    marginTop: UtilityMethods.hp(2),
    paddingHorizontal: UtilityMethods.wp(4),
    backgroundColor: Colors.WHITE,
    alignSelf: 'center',
    borderColor: Colors.BLACK,
    borderWidth: 1,
    width: '86%',
    marginBottom: Platform.OS === 'android' ? UtilityMethods.hp(2) : null,
  },
  textStyle: {
    color: Colors.BLACK
  }
});

export default NotificationsScreen;
