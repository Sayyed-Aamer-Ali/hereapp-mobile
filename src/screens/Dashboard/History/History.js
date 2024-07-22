import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Header, MainLayout } from '../../../components';
import { attendanceData } from '../../../Data/DummyData';
import AttendanceHistoryComponent from '../../../components/AttendanceHistoryComponent';
import styles from './style';

const History = () => {

  const renderItem = ({ item }) => (
    <AttendanceHistoryComponent
      status={item.status}
      className={item.className}
      dateTime={item.dateTime}
    />
  );

  return (
    <MainLayout>
      <Header title="Attendance History"
          showBackButton={false}
          DrawerHeader={true}
        />

      <FlatList
        data={attendanceData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContentContainer}
      />

    </MainLayout>
  );
}

export default History;
