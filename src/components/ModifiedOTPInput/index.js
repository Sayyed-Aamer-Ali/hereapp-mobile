import React from 'react';
import { Text, StyleSheet, Platform, View } from 'react-native';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { Colors, Fonts } from '../../assets';
import { FontSize, UtilityMethods } from '../../utility';

const CELL_COUNT = 3;

const ModifiedOtpInput = ({ value, setValue, style,keyboardType }) => {
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <CodeField
      ref={ref}
      {...props}
      value={value}
      onChangeText={setValue}
      cellCount={CELL_COUNT}
      rootStyle={styles.codeFieldRoot}
      keyboardType={keyboardType?keyboardType:"number-pad"}
      textContentType="oneTimeCode"
      autoFocus
      autoComplete={Platform.select({ android: 'sms-otp', default: 'one-time-code' })}
      renderCell={({ index, symbol, isFocused }) => (
        // <View>
        <Text
          key={index}
          style={[styles.cell,style, (isFocused || symbol) && styles.focusCell]}
          onLayout={getCellOnLayoutHandler(index)}
        >
          {symbol || (isFocused ? <Cursor /> : <View style={styles.footer}><View style={styles.noCursor} /></View>)}
        </Text>
        // </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  codeFieldRoot: {
    marginHorizontal: UtilityMethods.wp(15),
  },
  cell: {
    width: UtilityMethods.wp(16),
    minHeight: UtilityMethods.wp(22),
    fontSize: FontSize.VALUE(40),
    textAlign: 'center',
    color: Colors.BLACK,
    borderRadius: UtilityMethods.wp(1),
    borderWidth: 2,
    borderColor: Colors.BORDER_COLOR,
    textAlignVertical:'center',
    backgroundColor: Colors.WHITE,
    fontFamily: Fonts.REGULAR,
    paddingTop: Platform.OS === 'ios' ? (UtilityMethods.wp(22) - FontSize.VALUE(46)) / 2 : null
  },
  focusCell: {
    borderColor: Colors.BLACK,
  },
});

export default ModifiedOtpInput;
