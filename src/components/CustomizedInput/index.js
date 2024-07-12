import React from 'react';
import { View } from 'react-native';
import InputText from './TextInput';
import CustomDropDown from './CustomDropDown';
import CheckBox from './CheckBox';


const CustomizedInput = ({
  fieldInfo,
  onChange,
  ...props
}) => {
  

  const renderView = () => {
    switch (fieldInfo?.inputType) {
      case "text":
        return <InputText {...props} fieldInfo={fieldInfo} 
         onChange={onChange}
        
        />;
      case "dropdown":
        return <CustomDropDown {...props} value={value} />;

      case "checkbox":
        return <CheckBox {...props} filedInfo={fieldInfo} 
        onChange={(value) => {
          onChange(value);
        }}
        
        />;
      default:
        return <InputText {...props} fieldInfo={fieldInfo} />;
    }
  };
  

 
  return (
  <View>
    {renderView()}
  </View>
  )

}

export default CustomizedInput;
