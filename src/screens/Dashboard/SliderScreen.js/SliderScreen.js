import React from 'react';
import { Image, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { DrawerActions } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import { Icons } from '../../../assets';
import { setUser } from '../../../redux/Reducers/AuthReducer';
import { Constants } from '../../../utility';
import styles from './styles';


const SliderScreen = ({navigation}) => {
  const dispatch = useDispatch();

  let user = useSelector(state => state.auth.user);


  const onPressLogout = () => {
    navigation.dispatch(DrawerActions.closeDrawer())
    setTimeout(() => {
      dispatch(setUser(null))
    }
    , 500);
   

  }


  return (
    <View style={styles.cont}>
      <View style={styles.headerCont}>

       <Pressable style={styles.ImageCont}>
        <Image style={styles.imageView} source={{
          uri: user?.ProfileImage
        }}/>

       </Pressable>

        <Text style={styles.titleText}>{user?.fullName}</Text>

      </View>

      <View style={styles.body}>

        <FlatList
         data={Constants.DrawerItems}
          keyExtractor={(item,index) => index.toString()}
          renderItem={({item,index}) => (
            <TouchableOpacity style={styles.itemCont}
              onPress={() => {
                // navigation.navigate(item.screen)
              }}
            >
              <View style={styles.iconCont}>
              {item.icon}
              </View>
              <Text style={styles.itemText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />

        <TouchableOpacity
         style={styles.logoutCont}
         onPress={() => {
          onPressLogout()
         }}
        >

<View style={styles.iconCont}>
              <Icons.SignOut/>
              </View>
              <Text style={styles.itemText}>
                Logout
              </Text>

        </TouchableOpacity>
        
        </View>

    </View>
  );
}

export default SliderScreen;
