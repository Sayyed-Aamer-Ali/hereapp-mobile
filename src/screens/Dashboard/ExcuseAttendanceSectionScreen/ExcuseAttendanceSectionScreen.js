import React, { useEffect, useState, useCallback } from 'react';
import { Text, View, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ClassDetailBox, CustomFlatList, CustomizedInput, DatePickerComponent, EmptyComponent, Header, MainLayout, ModifiedOTPInput } from '../../../components';
import styles from './styles';
import { dummyExcuseData, MyClasses, particularDatesdummyExcuseData } from '../../../Data/DummyData';
import Routes from '../../../navigation/Routes';
import axiosWrapper from '../../../services/AxiosWrapper';
import { API_URLS } from '../../../services/apiPathList';
import formatDate from '../../../utility/FormateDate';

const ExcuseAttendanceSectionScreen = ({ navigation, route }) => {
  const title = route?.params?.title
  const index = route?.params?.index
  
  const [missedClasses, setMissedClasses] = useState(route?.params?.data);



  
  const [selectedDate, setSelectedDate] = useState(null);
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [classes, setClasses] = useState([]);
  const user = useSelector(state => state.auth.user);
  const token = useSelector(state => state.auth.token);
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const [search, setSearch] = useState({
    inputType: "text",
    value: "",
    type: "text",
    error: "",
    placeholder: "Search your missed class....",
    leftIcon: <Icons.SearchIcon />
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search.value);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search.value]);

  const filteredParticularDates = missedClasses.filter(item =>
    item.classDetail?.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );


  return (
    <MainLayout loader={loader}>
      <View style={styles.cont}>
        <Header title={title}
          showBackButton={true}
          DrawerHeader={false}
        />

        {
          index === 0 ?
            <CustomizedInput
              fieldInfo={search}
              onChange={(text) => {
                setSearch({ ...search, value: text, error: "" });
              }}
              InputContStyle={styles.searchInput}
            />
            : (
              <DatePickerComponent
                date={selectedDate}
                setDate={setSelectedDate}
                placeholder="Select a date"
                /// minimun date should be the next day of the current date//
                minimumDate={new Date(new Date().setDate(new Date().getDate() + 1))}


                
                
              />
            )
        }

        <CustomFlatList
          listStyle={styles.listStyle}
          ListEmptyComponent={() => (
            <EmptyComponent 
            title={'No Classes Found!'}
            desc={'Sorry we cannot find any registered class for you. Please contact your instructor.'}
            />
          )}
          data={missedClasses}
          keyExtractor={(item) => item?._id?.toString()}
          renderItem={({ item }) => (
            <ClassDetailBox
              item={item?.classDetail}
              buttonText="Request Excused Absence"
              onPress={() => { navigation.navigate(Routes.EXCUSE_ATTENDANCE_DETAIL_SCREEN)} }
              buttonDisableRequired={false}
              schedule={item?.classDetail?.schedule[0]}
            />
          )}
        />
      </View>
    </MainLayout>
  );
}

export default ExcuseAttendanceSectionScreen;
