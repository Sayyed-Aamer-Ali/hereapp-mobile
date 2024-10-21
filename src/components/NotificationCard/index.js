// NotificationCard.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Fonts, Icons } from '../../assets';
import { UtilityMethods, FontSize } from '../../utility';

const NotificationCard = ({ notification, onPress }) => {

  let CustomView = !notification.isRead ? TouchableOpacity : View;

  return (
    <CustomView style={styles.card} onPress={onPress} activeOpacity={0.7} >
      {
        !notification.isRead &&
        <View style={styles.dot} />
      }

      <View style={styles.iconContainer}>
        <Icons.NotificationIcon width={UtilityMethods.wp(6)} height={UtilityMethods.wp(6)} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{notification.title}</Text>
        <Text style={styles.message}>{notification.body}</Text>
      </View>
    </CustomView>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: UtilityMethods.hp(1.5),
    paddingHorizontal: UtilityMethods.hp(2),
    marginVertical: UtilityMethods.hp(1),
    backgroundColor: Colors.ReadNotification,
    borderRadius: UtilityMethods.wp(2),
    alignItems: 'center',
    shadowColor: Colors.BLACK,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 3,
    position: 'relative'
  },
  dot: {
    position: 'absolute',
    width: UtilityMethods.wp(1.5),
    height: UtilityMethods.wp(1.5),
    borderRadius: UtilityMethods.wp(1),
    backgroundColor: Colors.LINK,
    zIndex: 1,
    right: UtilityMethods.wp(2),
    top: UtilityMethods.wp(2)
  },
  iconContainer: {
    marginRight: UtilityMethods.wp(2),
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: FontSize.VALUE(16),
    color: Colors.GRAY,
    fontFamily: Fonts.BOLD,
    marginBottom: UtilityMethods.hp(0.2)
  },
  message: {
    fontSize: FontSize.VALUE(12),
    color: Colors.GRAY,
    fontFamily: Fonts.REGULAR,
  },
});

export default NotificationCard;
