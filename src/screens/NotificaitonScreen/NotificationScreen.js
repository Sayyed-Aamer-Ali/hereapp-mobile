// NotificationsScreen.js
import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Button, MainLayout, NotificationCard, ScreenWrapper } from '../../components';
import { Colors, Fonts, Icons } from '../../assets';
import { UtilityMethods, FontSize } from '../../utility';
import { notifications } from '../../Data/DummyData';
import Icon from 'react-native-vector-icons/Ionicons';


const NotificationsScreen = ({ navigation }) => {
  return (
    <MainLayout>
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.icon} onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={25} color={
              Colors.ICON_BLACK
            } />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Notifications</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.markAllRead}>Mark all as read</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <NotificationCard notification={item} />}
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
  headerLeft:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: FontSize.VALUE(18),
    fontFamily: Fonts.BOLD,
    color: Colors.BLACK,
    marginLeft:UtilityMethods.wp(2)
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
