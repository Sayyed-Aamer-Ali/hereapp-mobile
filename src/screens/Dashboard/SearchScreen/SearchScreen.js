import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Keyboard,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

import {
  CustomFlatList,
  CustomizedInput,
  Header,
  MainLayout,
} from '../../../components';

import AttendanceHistoryComponent from '../../../components/AttendanceHistoryComponent';
import styles from './style';
import {CommonStyles} from '../../../utility';
import {Colors, Icons} from '../../../assets';
import {useSelector} from 'react-redux';
import Routes from '../../../navigation/Routes';

const SearchScreen = ({navigation}) => {
  const [search, setSearch] = useState({
    inputType: 'text',
    value: '',
    type: 'text',
    error: '',

    placeholder: 'Search your missed class....',
    leftIcon: <Icons.SearchIcon />,
    focus: true,
  });

  let missedClasses = useSelector(state => state.temp.AllMissedClassesName);

  const [filterData, setFilterData] = useState(
    missedClasses?.AllMissedClassesName ?? [],
  );

  const handleSearch = text => {
    setSearch({...search, value: text, error: ''});

    if (text.length > 0) {
      let filteredData = missedClasses?.AllMissedClassesName.filter(item => {
        return item.toLowerCase().includes(text.toLowerCase());
      });
      setFilterData(filteredData);
    } else {
      setFilterData(missedClasses?.AllMissedClassesName ?? []);
    }
  };

  const handlePress = item => {
    Keyboard.dismiss();
    let title = 'Missed Classes';
    let index = 0;

    navigation.navigate(Routes.EXCUSE_ATTENDANCE_SECTION_SCREEN, {
      title,
      index,
      data: missedClasses?.AllMissedClasses ?? [],
      item,
    });
  };

  const renderItem = ({item}) => (
    <TouchableOpacity style={styles.rowView} onPress={() => handlePress(item)}>
      <FontAwesome6
        name="clock-rotate-left"
        size={20}
        color={Colors.LIGHT_GRAY}
      />

      <Text style={styles.regText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <MainLayout>
      <View style={styles.container}>
        <View style={styles.headerView}>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={25} color={Colors.ICON_BLACK} />
          </TouchableOpacity>
          <CustomizedInput
            fieldInfo={search}
            onChange={text => {
              handleSearch(text);
            }}
            InputContStyle={styles.inputContStyle}
            returnKeyType="search"
            returnKeyLabel="search"
            autoCapitalize="none"
            onSubmitEditing={() => {
              if (search.value.length > 0) {
                handlePress(search.value);
              } else {
                setSearch({...search, error: 'Please enter a valid search'});
              }
            }}
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
        </View>

        <CustomFlatList
          data={filterData}
          listStyle={styles.listStyle}
          keyboardShouldPersistTaps={'handled'}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContentContainer}
          ListEmptyComponent={
            <View style={styles.emptyCont}>
              <Text style={styles.title}>No data found</Text>
            </View>
          }
        />
      </View>
    </MainLayout>
  );
};

export default SearchScreen;
