// StudentCard.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { UtilityMethods,   FontSize } from '../../utility';
import { Colors, Fonts } from '../../assets';
import moment from 'moment';

const StudentAttendanceListCard = ({ student, locationPress,showLocation }) => {
  

  const getNetID = (email) => {
    return email.split('@')[0];
  }
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.label}>Student Name</Text>
        <Text style={styles.value}>{student.studentDetails.firstName} {student.studentDetails.lastName}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Net ID</Text>
        <Text style={styles.value}>{getNetID(student.studentDetails.email)}  </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Status</Text>
        <Text style={styles.value}>Present</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Date & Time</Text>
        <Text style={styles.value}>
          {moment(student.attendanceMarkedAt).format('MMM DD, YYYY hh:mm A')}
        </Text>
      </View>
      {showLocation && 
      <View style={styles.row}>
        <Text style={styles.label}>Location</Text>
        <TouchableOpacity onPress={locationPress}>
          <Text style={[styles.value, styles.link]}>View on Map</Text>
        </TouchableOpacity>
      </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: UtilityMethods.wp(4),
    padding:UtilityMethods.wp(4),
    paddingVertical: UtilityMethods.wp(3),
    marginVertical: UtilityMethods.hp(1),
    backgroundColor: Colors.WHITE,
    borderRadius: UtilityMethods.wp(2),
    shadowColor: Colors.BLACK,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: UtilityMethods.hp(0.5),
  },
  label: {
    fontSize: FontSize.VALUE(14),
    color: Colors.GRAY,
    fontFamily: Fonts.BOLD,
  },
  value: {
    fontSize: FontSize.VALUE(14),
    color: Colors.GRAY,
    fontFamily: Fonts.REGULAR,
    flex: 1,
    flexWrap: 'wrap',
    textAlign: 'right',
  },
  link: {
    color: Colors.LINK,
  },
});

export default StudentAttendanceListCard
;
