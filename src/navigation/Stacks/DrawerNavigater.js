import { createDrawerNavigator } from "@react-navigation/drawer";
import { Platform, StatusBar, StyleSheet,Dimensions } from "react-native";
import { Colors } from "../../assets";
import SliderScreen from "../../screens/Dashboard/SliderScreen.js/SliderScreen";
import { UtilityMethods } from "../../utility";
import Routes from "../Routes";
import BottomTab from "./BottomTab";
import { useEffect, useState } from "react";



const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {

  const [haveDigitalOnScreenButtons, setHaveDigitalOnScreenButtons] = useState(false);

  let windowHeigth = Dimensions.get('window').height;
  let screenHeigth = Dimensions.get('screen').height;
 
 
  useEffect(() => {
    if((screenHeigth-windowHeigth)-StatusBar.currentHeight > 0) {
       setHaveDigitalOnScreenButtons(true);
      // don't have digital on-screen buttons 
    } else {
      setHaveDigitalOnScreenButtons(false);
      // have digital on-screen buttons 
    }
  }
  ,[]);
  
  
  return (
  
<Drawer.Navigator
    drawerContent={(props) => <SliderScreen {...props} />}
      
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: "transparent",
        drawerInactiveBackgroundColor: "transparent",
        drawerHideStatusBarOnOpen: Platform.OS === "ios" ? true : haveDigitalOnScreenButtons?true:false,
        
        drawerStyle: styles.drawerStyle(haveDigitalOnScreenButtons),
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
  drawerStyle: (haveDigitalOnScreenButtons) => ({
    flex: 1,
    backgroundColor: Colors.WHITE,
    // width: "80%",
    borderTopEndRadius:UtilityMethods.wp(6),
    borderBottomEndRadius:UtilityMethods.wp(6),
    marginTop:Platform.OS === "ios" ? 0 : haveDigitalOnScreenButtons?0:StatusBar.currentHeight,
   
   

  }),
  sceneStyle: {
    backgroundColor: Colors.WHITE,
  },
});
