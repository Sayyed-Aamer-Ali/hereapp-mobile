import { Platform } from "react-native";

const Fonts = {
  REGULAR: Platform.OS === "ios" ? "InterTight-Regular" : "Regular",
  MEDIUM: Platform.OS === "ios" ? "InterTight-Medium" : "Medium",
  BOLD: Platform.OS === "ios" ? "InterTight-ExtraBold" : "Bold",
  SEMI_BOLD: Platform.OS === "ios" ? "InterTight-SemiBold" : "SemiBold",
};

export default Fonts;
