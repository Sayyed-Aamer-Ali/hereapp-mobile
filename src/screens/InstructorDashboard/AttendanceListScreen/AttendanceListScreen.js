// ParentComponent.js
import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { UtilityMethods, } from '../../../utility';
import { Header, MainLayout, StudentAttendanceListCard } from '../../../components';
import { attendanceListData } from '../../../Data/DummyData';
import Routes from '../../../navigation/Routes';

import io from 'socket.io-client';
import BaseUrl, { SocketUrl } from '../../../services/BaseUrl';

const AttendanceListScreen = ({ navigation }) => {

 

    const newSocket = io.connect(SocketUrl);





    useEffect(() => {
        
        initSocket();
    }, []);


    const initSocket = async() => {

    
        newSocket.on("attendanceMarked",(data) => {

            console.log("Attendance Marked",data)

        })
    
        
            // If there's no socket instance, create a new one
             
           
           
    
    }
    const renderItem = ({ item }) => {
        return (
            <StudentAttendanceListCard
                student={item}
                locationPress={() => navigation.navigate(Routes.ATTENDENCE_LOCATION_SCREEN)}
            />
        )
    }

    return (
        <MainLayout>
            <View style={styles.container}>
                <Header
                    title={"Attendance List"}
                    showBackButton={true}
                    DrawerHeader={false}
                />
                <FlatList
                    data={attendanceListData}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.contentContainerStyle}
                />
            </View>
        </MainLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    contentContainerStyle: {
        paddingVertical: UtilityMethods.hp(2)
    }
});

export default AttendanceListScreen;
