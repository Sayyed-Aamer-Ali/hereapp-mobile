import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CommonStyles, FontSize, UtilityMethods } from '../../utility';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../assets';
import { useNavigation } from '@react-navigation/native';

const Header = ({title}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerCont}> 
      <TouchableOpacity style={CommonStyles.ROW_VIEW}
      
      onPress={()=>navigation.goBack()}
      >
        <Icon name="chevron-back" size={25} color={
          Colors.BLACK
        }/>
        <Text style={styles.headerText}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default Header;

const styles = StyleSheet.create({

    headerCont: {
        width: "100%",
        height: UtilityMethods.hasNotch() ?UtilityMethods.hp(13):UtilityMethods.hp(8),
      
        flexDirection: "row",
        alignItems:"flex-end",
        justifyContent:"space-between",
        paddingHorizontal:UtilityMethods.wp(5),
        borderBottomWidth:1,
        borderBottomColor:Colors.GRAY_06,
        paddingBottom:UtilityMethods.hp(2),


      
    },
    headerText: {
        ...CommonStyles.MEDIUM,
        color:Colors.BLACK,
        fontSize: FontSize.VALUE(20),
        marginLeft:UtilityMethods.wp(1),
    }

});
