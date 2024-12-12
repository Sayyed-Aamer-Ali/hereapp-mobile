import React from 'react';
import {Image, Text, View} from 'react-native';
import {Colors, Images} from '../../assets';
import styles from './styles';
import {MainLayout} from '../../components';

const Splash = ({navigation}) => {
  return (
    <MainLayout
      statusbarBackgrund={Colors.PRIMARY}
      bottomColor={Colors.PRIMARY}>
      <View style={styles.cont}>
        <Image source={Images.SecondaryLogo} style={styles.logo} />
        <Text style={styles.titleText}>Here App</Text>
        <Text style={styles.regText}>Attendance Made Easier!</Text>
      </View>
    </MainLayout>
  );
};

export default Splash;
