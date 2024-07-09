import { StyleSheet } from "react-native";
import { CommonStyles, FontSize, UtilityMethods } from "../../../utility";
import { Colors } from "../../../assets";




const styles = StyleSheet.create({
  cont: {
    ...CommonStyles.CONTAINER,
    paddingTop:UtilityMethods.hp(10),
    paddingHorizontal:UtilityMethods.wp(10),
    
 

  },
  body:{rowGap:UtilityMethods.wp(4),marginTop:UtilityMethods.hp(5)},
  titleText:{
    ...CommonStyles.BOLD,
    color:Colors.BLACK,
    // marginTop:UtilityMethods.hp(5),
    fontSize:FontSize.VALUE(20),
    
  },
  linkView:{
    marginTop:"auto",
    alignItems:"center",
    ...CommonStyles.MARGIN_FROM_BOTTOM_WITH_NOSH,
    alignSelf:"center",


  },
  linkText:{
    ...CommonStyles.REGULAR,
    color:Colors.BLACK,
    fontSize:FontSize.VALUE(14),
    marginLeft:UtilityMethods.wp(1)
  }
});

export default styles;
