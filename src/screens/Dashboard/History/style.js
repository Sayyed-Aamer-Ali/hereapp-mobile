import { StyleSheet } from "react-native";
import { Colors } from "../../../assets";
import { UtilityMethods } from "../../../utility";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.WHITE,
      padding: UtilityMethods.wp(4),
    },
    listContentContainer: {
      paddingHorizontal: UtilityMethods.hp(2),
    },
  });

export default styles