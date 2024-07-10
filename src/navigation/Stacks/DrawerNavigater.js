import { createDrawerNavigator } from "@react-navigation/drawer";
import { Platform, StyleSheet } from "react-native";
import Routes from "../Routes";
import BottomTab from "./BottomTab";
import { Colors } from "../../assets";


const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      //drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: "transparent",
        drawerInactiveBackgroundColor: "transparent",
        // drawerActiveTintColor: Colors.PRIMARY,
        // drawerInactiveTintColor: Colors.GRAY,
        drawerHideStatusBarOnOpen: Platform.OS === "ios" ? true : false,
        // overlayColor: "transparent",
        drawerStyle: styles.drawerStyle,
        sceneContainerStyle: styles.sceneStyle,
        gestureEnabled: true,
        drawerType: "front",
        drawerPosition: "left",
      }}
    >
      <Drawer.Screen name={Routes.BOTTOM_TAB} component={BottomTab} />
      

    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
const styles = StyleSheet.create({
  drawerStyle: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    width: "70%",
  },
  sceneStyle: {
    backgroundColor: Colors.WHITE,
  },
});
