import React from 'react';
import { View, Text, Pressable, TouchableOpacity,StyleSheet } from 'react-native';

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
    >
     {filedInfo?.value ? (
       
         <Icon name="checksquare" size={24} color={
          Colors.BLACK
        }/>
      
        ) : (
          <Icon name="checksquareo" size={24} color={
            Colors.BLACK
          }/>
        )}
    </TouchableOpacity>
  );
}

export default CheckBox;

const styles = StyleSheet.create({
  checkBox:{
    width:UtilityMethods.wp(4),
    height:UtilityMethods.wp(4),
    borderRadius:1,
    backgroundColor:Colors.BLACK,
    justifyContent:"center",
    alignItems:"center"
  }
})
