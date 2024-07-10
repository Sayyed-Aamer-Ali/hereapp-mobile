import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CommonStyles, FontSize, UtilityMethods } from '../../utility';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors, Fonts } from '../../assets';
import { useNavigation } from '@react-navigation/native';

const Header = ({title}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerCont}> 
    <View style={CommonStyles.ROW_VIEW}>
    <TouchableOpacity 
      style={styles.icon}
      onPress={()=>navigation.goBack()}
      >
        <Icon name="arrow-back" size={25} color={
          Colors.ICON_BLACK
        }/>
       
      </TouchableOpacity>

      <Text style={styles.headerText}>
          {title}
        </Text>
    </View>
     
    </View>
  );
}

export default Header;

const styles = StyleSheet.create({

    headerCont: {
        width: "100%",
        height: UtilityMethods.hp(8),
         flexDirection: "row",
        alignItems:"center",
        justifyContent:"space-between",
        ...CommonStyles.PADDING_HORIZONTAL
         


      
    },
    icon:{
      width:UtilityMethods.wp(12),

    },
    headerText: {
       
        color:Colors.ICON_BLACK,
        fontSize: FontSize.VALUE(18),
      
        fontFamily:Fonts.SEMI_BOLD,
    }

});
