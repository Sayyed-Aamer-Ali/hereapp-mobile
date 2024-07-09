import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

import { CommonStyles, UtilityMethods } from '../../utility';
import { Colors } from '../../assets';

const { wp, hp } = UtilityMethods;

const OtpInput = ({ numOfDigits = 4, onComplete }) => {
    const [digits, setDigits] = useState(Array(numOfDigits).fill(''));
    const inputRefs = useRef(digits.map(() => React.createRef()));
    
/// Handle change text ///
    const handleChangeText = (text, index) => {
        const newDigits = [...digits];
        newDigits[index] = text;
        setDigits(newDigits);

        if (text && index < numOfDigits - 1) {
            inputRefs.current[index + 1].current.focus();
        } else if (!text && index > 0) {
            inputRefs.current[index - 1].current.focus();
        }

        if (index === numOfDigits - 1 && text) {
            onComplete(newDigits.join(''));
        }
    };
  /// Handle backspace /// 
    const handleKeyPress = (e, index) => {
        if (e.nativeEvent.key === 'Backspace' && !digits[index] && index > 0) {
            inputRefs.current[index - 1].current.focus();
        }
    };

    return (
        <View style={styles.container}>
            {digits.map((digit, index) => (
                <TextInput
                    key={index}
                    style={styles.input}
                    keyboardType="numeric"
                    maxLength={1}
                    onChangeText={(text) => handleChangeText(text, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    value={digit}
                    ref={inputRefs.current[index]}
                    autoFocus={index === 0}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    input: {
        ...CommonStyles.REGULAR,
        borderRadius: hp(1),
        width: wp(15),
        height: wp(15),
        textAlign: 'center',
        backgroundColor: Colors.GRAY_06,
        color: Colors.BLACK,
    },
});

export default OtpInput;
