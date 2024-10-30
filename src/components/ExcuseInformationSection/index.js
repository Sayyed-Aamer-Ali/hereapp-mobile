import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Fonts, Colors } from '../../assets';
import { FontSize, UtilityMethods } from '../../utility';
import moment from 'moment';
import { formatSchedule, getFormattedDate } from '../../utility/FormateDate';

const ExcuseInformationSection = ({ className, classSection, dateTime,day }) => {
  const { 
    // formattedDate, 
    formattedTimeSlot } = formatSchedule(dateTime);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Requesting attendance for class:</Text>
      <Text style={styles.value}>{className}</Text>

      <Text style={styles.label}>Semester:</Text>
      <Text style={styles.value}>{classSection}</Text>

      <Text style={styles.label}>Date and Time:</Text>
      <Text style={styles.value}>
        {getFormattedDate(day)} , {formattedTimeSlot}
         </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: UtilityMethods.wp(4),
    paddingTop:UtilityMethods.hp(2),
    paddingBottom:UtilityMethods.hp(2)
  },
  label: {
    fontFamily: Fonts.REGULAR,
    fontSize: FontSize.VALUE(14),
    color: Colors.GRAY,
  },
  value: {
    fontFamily: Fonts.MEDIUM,
    fontSize: FontSize.VALUE(16),
    color: Colors.BLACK,
    marginBottom: UtilityMethods.hp(1),
    lineHeight:FontSize.VALUE(19),
    marginTop:UtilityMethods.hp(0.5)

  },
});

export default ExcuseInformationSection;
