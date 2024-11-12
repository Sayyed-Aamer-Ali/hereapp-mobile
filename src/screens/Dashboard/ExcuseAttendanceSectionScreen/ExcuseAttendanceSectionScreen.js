import React, {useEffect, useState, useCallback} from 'react';
import {Text, View, RefreshControl, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  ClassDetailBox,
  CustomFlatList,
  CustomizedInput,
  DatePickerComponent,
  EmptyComponent,
  Header,
  MainLayout,
  ModifiedOTPInput,
} from '../../../components';
import styles from './styles';
import {
  dummyExcuseData,
  MyClasses,
  particularDatesdummyExcuseData,
} from '../../../Data/DummyData';

import AntDesign from 'react-native-vector-icons/AntDesign';

import Routes from '../../../navigation/Routes';
import axiosWrapper from '../../../services/AxiosWrapper';
import {API_URLS} from '../../../services/apiPathList';
import formatDate, {
  filterAndSortClassesByDate,
  filterAndSortClassesBySpecificDate,
  sortClassesByDate,
} from '../../../utility/FormateDate';
import {Colors} from '../../../assets';
import {setAllMissedClassesName} from '../../../redux/Reducers/TempData';

const ExcuseAttendanceSectionScreen = ({navigation, route}) => {
  const title = route?.params?.title;
  const index = route?.params?.index;
  let searchField = route?.params?.item;

  let date = route?.params?.date;

  const [missedClasses, setMissedClasses] = useState(route?.params?.data);
  const [refreshing, setRefreshing] = useState(false);

  const [selectedDate, setSelectedDate] = useState(null);
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [classes, setClasses] = useState([]);
  const user = useSelector(state => state.auth.user);
  const token = useSelector(state => state.auth.token);
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const [search, setSearch] = useState({
    inputType: 'text',
    value: '',
    type: 'nonEditable',
    error: '',
    placeholder: 'Search your missed class....',
    leftIcon: <Icons.SearchIcon />,
    onPress: () => {
      handleSearch();
    },
  });

  const handleSearch = () => {
    navigation.push(Routes.SEARCH_SCREEN);
  };

  useEffect(() => {
    if (search.value.length == 0) {
      setMissedClasses(route?.params?.data);
    }
  }, [search.value]);

  useEffect(() => {
    if (searchField) {
      setSearch({...search, value: searchField});
      let filteredParticularDates = missedClasses.filter(item =>
        item.classDetail?.name
          .toLowerCase()
          .includes(searchField.toLowerCase()),
      );

      setMissedClasses(filteredParticularDates);
    } else {
      setMissedClasses(route?.params?.data);
    }
  }, [searchField, route?.params?.data]);

  useEffect(() => {
    if (index == 1) {
      if (selectedDate && route?.params?.data) {
        let data = filterAndSortClassesBySpecificDate(
          route?.params?.data,
          selectedDate,
        );

        setMissedClasses(data);
      } else {
        setMissedClasses([]);
      }
    }
  }, [date, index, selectedDate]);

  useEffect(() => {
    if (date) {
      setSelectedDate(date);
    }
  }, [date]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getAllMissedClasses();
  }, [search, selectedDate]);

  const getAllMissedClasses = async () => {
    let baseUrl = API_URLS.FETCH_ALL_MISSED_CLASSES;
    try {
      let response = await axiosWrapper(
        'GET',
        baseUrl,
        null,
        token,
        false,
        'json',
        false,
      );

      let sortClasses = sortClassesByDate(response.data);

      let filteroutNames = response.data.map(item => {
        return item.classDetail.name;
      });
      let uniqueNames = [...new Set(filteroutNames)];

      dispatch(
        setAllMissedClassesName({
          AllMissedClassesName: uniqueNames,
          AllMissedClasses: response.data,
        }),
      );

      if (search.value.length > 0) {
        let filteredParticularDates = response.data.filter(item =>
          item.classDetail?.name
            .toLowerCase()
            .includes(search.value.toLowerCase()),
        );

        setMissedClasses(filteredParticularDates);
        return;
      }

      if (index == 1) {
        if (selectedDate) {
          let data = filterAndSortClassesBySpecificDate(
            response.data,
            selectedDate,
          );

          setMissedClasses(data);
        }
        return;
      }

      setMissedClasses(sortClasses);
    } catch (error) {
      console.log('error', error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <MainLayout loader={loader}>
      <View style={styles.cont}>
        <Header
          title={title}
          showBackButton={true}
          DrawerHeader={false}
          onPressIcon={() => navigation.navigate(Routes.EXCUSE_ATTENDANCE)}
        />

        {index === 0 ? (
          <CustomizedInput
            fieldInfo={search}
            onChange={text => {
              setSearch({...search, value: text, error: ''});
            }}
            InputContStyle={styles.searchInput}
            RightIcon={
              <TouchableOpacity
                style={styles.icon}
                onPress={() => {
                  setSearch({...search, value: '', error: ''});
                }}>
                {search.value.length > 0 && (
                  <AntDesign
                    name="closecircle"
                    size={20}
                    color={Colors.ICON_BLACK}
                  />
                )}
              </TouchableOpacity>
            }
          />
        ) : (
          <DatePickerComponent
            date={selectedDate}
            setDate={setSelectedDate}
            placeholder="Select a date"
            /// minimun date should be the next day of the current date//
            maximumDate={new Date(new Date().setDate(new Date().getDate() - 1))}
          />
        )}

        <CustomFlatList
          listStyle={styles.listStyle}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={() => (
            <EmptyComponent
              title={'No Classes Found!'}
              desc={
                'Sorry we cannot find any registered class for you. Please contact your instructor.'
              }
            />
          )}
          data={missedClasses}
          keyExtractor={item => item?._id?.toString()}
          renderItem={({item}) => (
            <ClassDetailBox
              item={item?.classDetail}
              buttonText="Request Excused Absence"
              onPress={() => {
                navigation.navigate(Routes.EXCUSE_ATTENDANCE_DETAIL_SCREEN, {
                  data: item,
                });
              }}
              buttonDisableRequired={true}
              schedule={item?.classDetail?.schedule[0]}
              dates={item?.attendanceStartedAt}
              data={item}
            />
          )}
        />
      </View>
    </MainLayout>
  );
};

export default ExcuseAttendanceSectionScreen;
