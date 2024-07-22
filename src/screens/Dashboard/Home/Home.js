import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { ClassDetailBox, CustomFlatList, EmptyComponent, Header, MainLayout, ModifiedOTPInput } from '../../../components';
import styles from './styles';
import { MyClasses } from '../../../Data/DummyData';
import Routes from '../../../navigation/Routes';



const Home = ({ navigation }) => {
  const dispatch = useDispatch();


  const handleAttendance = (item) => {
    navigation.navigate(Routes.ATTENDANCE, {item})
  }

  return (
    <MainLayout>
      <View style={styles.cont}>
        <Header title="Home"
          showBackButton={false}
          DrawerHeader={true}

        />
        <CustomFlatList
          listStyle={styles.listStyle}
          ListEmptyComponent={() => (
            <EmptyComponent />
          )}
          ListHeaderComponent={
            <View style={styles.headerCont}>
              <Text style={styles.headerText}>My Classes</Text>
              <Text style={styles.regText}>
                for Thursday, 20th Feb 2024
              </Text>
            </View>
          }
          data={MyClasses}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ClassDetailBox
              item={item}
              onPress={() => handleAttendance(item)}
            />
          )}



        />

      </View>
    </MainLayout>



  );
}

export default Home;
