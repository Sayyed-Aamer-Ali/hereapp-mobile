import React from 'react';
import { View, Text, Pressable, TouchableOpacity } from 'react-native';
import styles from './styles';
import { Icons } from '../../assets';
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
        <Icons.Checked 
         width={UtilityMethods.wp(5)}
          height={UtilityMethods.wp(5)}
        />
        ) : (
            <Icons.UnChecked 
            width={UtilityMethods.wp(5)}
            height={UtilityMethods.wp(5)}
            />
        )}
    </TouchableOpacity>
  );
}

export default CheckBox;
