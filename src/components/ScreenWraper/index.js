import {
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

 const ScreenWrapper = ({
  children,
  style,
  model = false,
  ref,
  req = true,
}) => {
  return (
    // <KeyboardAwareScrollView style={{flex: 1}} contentOffset={{x:10,y:20}}>
    <KeyboardAwareScrollView
      style={[styles.containerMain, style]}
      keyboardShouldPersistTaps="handled"q
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      enableAutomaticScroll={true}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      
      
    >
      {children}
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: Platform.OS == "android" ? 15 : 0,
  },
  containerMain: {
    flex: 1,
  },
});

export default ScreenWrapper;
