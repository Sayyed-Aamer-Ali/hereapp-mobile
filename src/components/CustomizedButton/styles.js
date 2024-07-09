import { StyleSheet } from "react-native";
import { Colors } from "../../assets";
import { CommonStyles, FontSize, UtilityMethods } from "../../utility";



const styles = StyleSheet.create({

  mainContainer:{
    backgroundColor: Colors.PRIMARY,
    height: UtilityMethods.hp(7),
    borderRadius: UtilityMethods.hp(3),
    justifyContent: "center",
    alignItems: "center",
  },

  buttonWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
   
  },
  buttonText: (disabled) => ({
    color: disabled ? Colors.PRIMARY : Colors.WHITE,
    fontSize: FontSize.VALUE(17),
    ...CommonStyles.MEDIUM,
  }),
  buttonWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
