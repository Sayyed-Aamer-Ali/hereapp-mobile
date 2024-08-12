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
  contentContainerStyle
}) => {
  return (
    <KeyboardAwareScrollView
      style={[styles.containerMain, style]}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={[{ flexGrow: 1, },contentContainerStyle]}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      bounces={false}
      extraScrollHeight={16}
      >
      {children}
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerMain: {
    flex: 1,
  },
});

export default ScreenWrapper;
