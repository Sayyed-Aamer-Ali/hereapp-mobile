import { Colors } from "../../assets";
import { CommonStyles, FontSize, UtilityMethods } from "../../utility";

const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
  cont: {
    ...CommonStyles.CONTAINER,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:Colors.PRIMARY
  },
  titleText:{
    ...CommonStyles.BOLD,
    color:Colors.WHITE,
    marginTop:UtilityMethods.hp(5),
    fontSize:FontSize.VALUE(20)
  }
});

export default styles;
