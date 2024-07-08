import { StyleSheet } from "react-native";
import { CommonStyles, FontSize, UtilityMethods } from "../../../utility";
import { Colors } from "../../../assets";




const styles = StyleSheet.create({
  cont: {
 
    paddingTop:UtilityMethods.hp(10),
   
 

  },
  titleText:{
    ...CommonStyles.BOLD,
    color:Colors.BLACK,
    // marginTop:UtilityMethods.hp(5),
    fontSize:FontSize.VALUE(20),
    textAlign:"center"
  },
  button:{
  
    marginTop:UtilityMethods.hp(5),
    backgroundColor:Colors.SECONDARY1,
    width:UtilityMethods.wp(90),


  },
  linkText:{
    ...CommonStyles.REGULAR,
    color:Colors.BLACK,
    fontSize:FontSize.VALUE(14),
    marginLeft:UtilityMethods.wp(1)
  },
  otpContainer:{
 
    width:UtilityMethods.wp(90),
    alignSelf:"center",
    backgroundColor:Colors.RED,
  

  },
  bodyView:{
    flex:1,
   paddingTop:UtilityMethods.hp(20),
    alignItems:"center"
  }
});

export default styles;
