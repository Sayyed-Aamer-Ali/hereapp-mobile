import React, { useState } from 'react';
import { ImageBackground, Text, View ,

  TouchableOpacity,
  Alert
} from 'react-native';
import { AlertWithTwoButtons, Button, CustomizedInput, Header, ScreenWrapper ,} from '../../../components';
import Icon from 'react-native-vector-icons/AntDesign';
import Routes from '../../../navigation/Routes';
import { CommonStyles, Constants, UtilityMethods, Validator } from '../../../utility';
import styles from './styles';
import { useSelector } from 'react-redux';

import { Colors } from '../../../assets';
import AlertService from '../../../services/AlertService';

const ExcuseAttandence = ({navigation}) => {

  const user = useSelector(state => state.auth.user);
  const [userClass, setUserClass] = useState();
  const [description, setDescription] = useState();

 



  const handlePassword = (text,type) => {
    switch (type) {
      case "class":
        setUserClass(text.value)
        break;
      case "description":
        setDescription(text)
        break;
      default:
        break;
    }


    
  }

  const onPressUpdate = () => {
    navigation.goBack()

  
  

    


  }



  return (
    <View style={CommonStyles.CONTAINER}>
    <Header
     title={"Excuse Attendance"}
    />
    <ScreenWrapper style={[CommonStyles.BODY,styles.cont]}>

   
  <View style={styles.inputView}>

    <CustomizedInput
      placeholder={"Select Class"}
      type={"picker"}
      value={userClass}
      onChangeText={(text)=>handlePassword(text,"class")}
      data={Constants.Class}
      />

    <CustomizedInput
      placeholder={"Description"}
      type={"text"}
      value={description}
      onChangeText={(text)=>handlePassword(text,"description")}
      multiline={true}
      maxLength={200}
      numberOfLines={4}
      InputContStyle={{
        height:UtilityMethods.hp(20),
        justifyContent: null,
        alignItems: null,
        paddingTop: UtilityMethods.hp(3),
      }}


      />

     
     
      <Button 
       text={"Apply Excuse"}
       onPress={()=>{
        onPressUpdate()
       }}
       style={styles.button}
      />

  </View>


      




    
   
    </ScreenWrapper>
    </View>
  );
}

export default ExcuseAttandence;
