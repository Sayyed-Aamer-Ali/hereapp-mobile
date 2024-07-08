import PropTypes from 'prop-types';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import MaterailIcon from 'react-native-vector-icons/AntDesign';
import { Image, Pressable, TextInput, TouchableOpacity, View, Text } from 'react-native';
import { Colors, Icons, Images } from '../../assets';
import styles from './styles';
import { UtilityMethods, CommonStyles, FontSize } from '../../utility';
import { useFocusEffect } from '@react-navigation/native';


export const InputTypes = {
  EMAIL: 'email',
  PASSWORD: 'password',
  TEXT: 'text',
  PICKER: 'picker',
  PHONE_NUMBER: 'phone',
  NAME: 'name',
};


 const CustomizedInput = ({
  type,
  LeftIcon,
  RightIcon,
  RightIconType = 'svg',
  style,
  keyboardType,
  onPress,
  InputContStyle,
  isInValidField = false,
  setIsInValidField,
  Error,
  setError,
  FirstScreen = true,
  maxLength,
  inputWithBorder = false,
  iconSource,
  TextArea = false,
  iconStyle,
  inputContStyle,
  onFocus,
  optional,
  countryCode,
  onChangeCountryCode,
  inputStyle,
  titleStyle,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(true);
  const inputRef = useRef(null);
  const navigation = useNavigation();
  const [show, setShow] = useState(false);


 
  return (
    <View style={[styles.mainCont, style]}>
      {props?.title && (
        <Text style={[styles.TitleStyle, titleStyle]}>{props?.title}</Text>
      )}
      <View
        style={{
          height: props?.title ? UtilityMethods.hp(1) : null,
        }}
      />
    <View style={[styles.container(isInValidField), InputContStyle]}>
          {LeftIcon && (
            <>
              <LeftIcon width={UtilityMethods.hp(15)} height={UtilityMethods.hp(15)} />
              <View style={{ width: 10 }} />
            </>
          )}
          {type == InputTypes.PHONE_NUMBER && (
            <TouchableOpacity
              onPress={() => setShow(true)}
              style={{
                flexDirection: 'row',
              }}
            >
              <Text
                style={{
                  fontSize: FontSize.VALUE(16),
                  ...CommonStyles.MEDIUM,
                  marginRight: 5,
                }}
              >
                {flag} {countryCode}
              </Text>
              <Image
                resizeMode="contain"
                source={Images.DOWN_ARROW}
                style={{
                  width: UtilityMethods.wp(5),
                  height: UtilityMethods.wp(5),
                  marginRight: 5,
                }}
              />
            </TouchableOpacity>
          )}

          <View style={{ flex: 1 }}>
            {type == InputTypes.PICKER ? (
              <Dropdown
                placeholder={props?.placeholder}
                data={props?.data?props?.data:[]}
                maxHeight={300}
                value={props?.value}
                onChange={props?.onChangeText}
                style={[styles.input, inputStyle,]}
                inputStyle={{ color: Colors.BLACK }}
                placeholderStyle={{ color: Colors.DARK_GRAY }}
                // containerStyle={{ width: '100%' }}
                // dropdownStyle={{ width: '100%' }}
                // dropDownContainerStyle={{ width: '100%' }}
                labelField={"label"}
                valueField={"value"}
                renderRightIcon={() => (
                  <MaterailIcon
                    name="down"
                    size={20}
                    color={Colors.BLACK}
                  />
                )
                }
                />
            ) : (
              <TextInput
                ref={inputRef}
                onFocus={onFocus}
                style={[styles.input, inputStyle]}
                secureTextEntry={type === InputTypes.PASSWORD && showPassword}
                keyboardType={type === InputTypes.EMAIL ? 'email-address' : keyboardType}
                placeholderTextColor={Colors.PLACEHOLDERTEXTCOLOR}
                numberOfLines={props?.numberOfLines ? props?.numberOfLines : 1}
                maxLength={maxLength ? maxLength : 40}
                autoCapitalize={InputTypes.EMAIL ? 'none' : props?.autoCapitalize}
                {...props}
              />
            )}
          </View>

          {RightIcon && RightIconType === 'svg' && <RightIcon width={UtilityMethods.wp(15)} height={UtilityMethods.wp(15)} />}
          {RightIcon && RightIconType === 'png' && (
            <Image
              source={RightIcon}
              style={{
                width: UtilityMethods.wp(5),
                height: UtilityMethods.wp(5),
              }}
            />
          )}
          {type === InputTypes.PASSWORD && (
            <TouchableOpacity onPress={() => setShowPassword((p) => !p)}>
              {showPassword ? (
                <Image source={Images.EYE_CLOSE} style={styles.eyeIcon} />
              ) : (
                <Image source={Images.EYE_OPEN} style={styles.eyeIcon} />
              )}
            </TouchableOpacity>
          )}
        </View>
     
      {Error?.length > 0 ? <Text style={styles.ErrorText}>{Error}</Text> : null}
    </View>
  );
};

CustomizedInput.propTypes = {
  type: PropTypes.oneOf(Object.values(InputTypes)).isRequired,
  LeftIcon: PropTypes.element,
  style: PropTypes.object,
};

export default CustomizedInput;
