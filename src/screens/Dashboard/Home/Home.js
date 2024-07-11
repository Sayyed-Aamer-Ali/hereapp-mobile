import React from 'react';
import { Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { ClassDetailBox, CustomFlatList, Header, MainLayout } from '../../../components';
import styles from './styles';
import { MyClasses } from '../../../Data/DummyData';



const Home = ({navigation}) => {
  const dispatch = useDispatch();

  return (
     <MainLayout>
<View style={styles.cont}>
        <Header title="Home" 
        showBackButton={false}
        DrawerHeader={true}
        
        />
        <CustomFlatList
         listStyle={styles.listStyle}
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
          <ClassDetailBox item={item} />
        )}
        

         />
      </View>
     </MainLayout>
      

   
  );
}

export default Home;
