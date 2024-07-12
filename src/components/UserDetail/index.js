import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts } from '../../assets';
import { UtilityMethods, FontSize } from '../../utility';

const UserDetails = ({ userData }) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Full Name:</Text>
        <Text style={styles.value}>{userData.fullName}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Phone:</Text>
        <Text style={styles.value}>{userData.phoneNumber || '-'}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Address:</Text>
        <Text style={[styles.value,styles.address]}>{userData.address || '-'}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Postal Code:</Text>
        <Text style={styles.value}>{userData.postalCode || '-'}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Purpose Of Platform Use:</Text>
        <Text style={styles.value}>{userData.platformUse || 'Education'}</Text>
      </View>
    </View>
  );
};

export default UserDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    marginVertical:UtilityMethods.hp(4)
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: UtilityMethods.hp(2),
  },
  label: {
    fontSize: FontSize.VALUE(16),
    fontFamily: Fonts.REGULAR,
    color: Colors.GRAY,
    // width:'40%',
    marginRight:UtilityMethods.wp(12)
  },
  value: {
    fontSize: FontSize.VALUE(16),
    fontFamily: Fonts.MEDIUM,
    color: Colors.LIGHT_GRAY,
    textAlign:'right'
  },
  address:{
    width:'70%',
  },
});
