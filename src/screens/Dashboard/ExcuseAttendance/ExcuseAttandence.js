import React, { useState, useEffect } from 'react';
import {
  Text, View, SectionList, StyleSheet
} from 'react-native';
import { ClassDetailBox, CustomizedInput, DatePickerComponent, EmptyComponent, ExcussedMissedClassTitle, Header, MainLayout, ScreenWrapper, } from '../../../components';
import Routes from '../../../navigation/Routes';
import styles from './styles';
import { useSelector } from 'react-redux';
import { Icons } from '../../../assets';
import { dummyExcuseData, particularDatesdummyExcuseData } from '../../../Data/DummyData';

const ExcuseAttandence = ({ navigation }) => {
  const user = useSelector(state => state.auth.user);
  const [selectedDate, setSelectedDate] = useState(null);

  const [search, setSearch] = useState({
    inputType: "text",
    value: "",
    type: "text",
    error: "",
    placeholder: "Search your missed class....",
    leftIcon: <Icons.SearchIcon />
  });

  const dataSections = [
    { index: 0, title: "Recently Missed Classes", data: dummyExcuseData, },
    { index: 1, title: "Request for a Particular Date", data: particularDatesdummyExcuseData }
  ];

  const renderSectionHeader = ({ section: { title, index } }) => {
    return (
      <>
        <ExcussedMissedClassTitle title={title} 
        onPress={()=>navigation.navigate(Routes.EXCUSE_ATTENDANCE_SECTION_SCREEN,
          {title, index }
          )}/>
        {
          index === 1 && (
            <DatePickerComponent
              date={selectedDate}
              setDate={setSelectedDate}
              placeholder="Select a date"
            />
          )
        }
      </>
    )
  }

  return (
    <MainLayout>
      <Header title="Excused Absence"
        showBackButton={true}
        DrawerHeader={false}
      />

      <CustomizedInput
        fieldInfo={search}
        onChange={(text) => {
          setSearch({ ...search, value: text, error: "" });
        }}
        InputContStyle={styles.searchInput}
      />

      <SectionList
        sections={dataSections}
        stickySectionHeadersEnabled={false}
        keyExtractor={(item, index) => item._id + index}
        renderItem={({ item }) => (
          <ClassDetailBox
            item={item}
            buttonText="Request Excused Absence"
            onPress={() => { navigation.navigate(Routes.EXCUSE_ATTENDANCE_DETAIL_SCREEN) }}

          />
        )}
        renderSectionHeader={renderSectionHeader}
        ListEmptyComponent={() => (
          <EmptyComponent />
        )}
        renderSectionFooter={() => (
          <View style={styles.footer} />
        )}
        contentContainerStyle={styles.sectionListContent}
      />
    </MainLayout>
  );
}

export default ExcuseAttandence;

