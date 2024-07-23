import React from 'react';
import { View, Text, Pressable, TouchableOpacity, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';

import { Colors, Icons } from '../../assets';
import { UtilityMethods } from '../../utility';

const CheckBox = ({
  filedInfo,
  onChange,
}) => {
  return (
    <TouchableOpacity
      onPress={() => onChange(!filedInfo?.value)}
      style={styles.checkBox}
    >
      {filedInfo?.value && (
        <Icon name="check" size={12} color={
          Colors.BLACK
        } />
      )}

    </TouchableOpacity>
  );
}

export default CheckBox;

const styles = StyleSheet.create({
  checkBox: {
    width: UtilityMethods.wp(4),
    height: UtilityMethods.wp(4),
    justifyContent: "center",
    alignItems: "center",
    flexDirection:'row',
    borderWidth: 1,
    borderColor: Colors.BLACK,

  }
})
