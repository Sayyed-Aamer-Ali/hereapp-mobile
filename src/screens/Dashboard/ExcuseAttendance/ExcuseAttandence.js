import React, { useState, useEffect } from 'react';
import {
  Text, View, SectionList, StyleSheet
} from 'react-native';
import { ClassDetailBox, CustomFlatList, CustomizedInput, DatePickerComponent, EmptyComponent, ExcussedMissedClassTitle, Header, MainLayout, ScreenWrapper, } from '../../../components';
import Routes from '../../../navigation/Routes';
import styles from './styles';
import { useSelector } from 'react-redux';
import { Icons } from '../../../assets';
import { dummyExcuseData, particularDatesdummyExcuseData } from '../../../Data/DummyData';
import axiosWrapper from '../../../services/AxiosWrapper';
import { API_URLS } from '../../../services/apiPathList';
import { filterAndSortClassesByDate, filterAndSortClassesBySpecificDate } from '../../../utility/FormateDate';

const ExcuseAttandence = ({ navigation }) => {
  const user = useSelector(state => state.auth.user);

  const token = useSelector(state => state.auth.token);

const [missedClasses,setMissedClasses]=useState([]);

const [allMissedClasses,setAllMissedClasses]=useState([]);

  const [selectedDate, setSelectedDate] = useState(null);
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [search, setSearch] = useState({
    inputType: "text",
    value: "",
    type: "text",
    error: "",
    placeholder: "Search your missed class....",
    leftIcon: <Icons.SearchIcon />
  });

  const [dataSections,setDateSections]= useState([
    { index: 0, title: "Recently Missed Classes", data: [] },
    { index: 1, title: "Request for a Particular Date", data: [] } 
  ]);


  

   useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search.value);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search.value]);

  const filteredParticularDates = particularDatesdummyExcuseData.filter(item =>
    item.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  useEffect(() => {

    getAllMissedClasses();
  }, [])



  const getAllMissedClasses = async() => {
    let baseUrl = API_URLS.FETCH_ALL_MISSED_CLASSES;
    try {
      let response = await axiosWrapper('GET', baseUrl, null, token, false, 'json', false);

      setAllMissedClasses(response.data);
      let data = filterAndSortClassesByDate(response.data);

       setMissedClasses(data);

      setDateSections([
        { index: 0, title: "Recently Missed Classes", data: [
          data.slice(0, 1)
        ] },
        { index: 1, title: "Request for a Particular Date", data: [] }
      ]);
      
    } catch (error) {
      console.log(error);
    }

  }

  const renderSectionHeader = ({ section: { title, index } }) => {
    
    return (
      <>
        <ExcussedMissedClassTitle title={title}
          onPress={() => navigation.navigate(Routes.EXCUSE_ATTENDANCE_SECTION_SCREEN,
            { title, index,
              data:index===0?missedClasses:dataSections[1].data[0],
              
             }
          )} />
        {
          index === 1 && (
            <DatePickerComponent
              date={selectedDate}
              
              setDate={(date) => {
                filterDateSpecificClasses(date);
              }}
              placeholder="Select a date"
              
              minimumDate={new Date(new Date().setDate(new Date().getDate() + 1))}
            />
          )
        }
      </>
    )
  }


  const filterDateSpecificClasses = (date) => {

    setSelectedDate(date);
    let data = filterAndSortClassesBySpecificDate(allMissedClasses, date);
     setDateSections((prevState) => {
      return prevState.map((item) => {
        if (item.index === 1) {
          return { ...item, data: [data] };
        }
        return item;
      });

    });

  }


  const renderFlatList = ({ item,index,section }) => {

    return (
      <View style={styles.sectionView(section.index)}>
 <CustomFlatList
        
        data={item}
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
        ListEmptyComponent={() => (
          <View style={styles.emptyListView}>
            <Text
              style={styles.title}>No Classes Found!</Text>

            <Text style={styles.description}>
              {section.index === 0 ? 'Sorry we cannot find any missed class for you.' : 'Sorry we cannot find any registered class for you.for this date.'}
            </Text>
         
          </View>
        )}
      />
      </View>
     
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

      {
        search.value === '' ?
          <SectionList
            sections={dataSections}
            style={{ flex: 1 }}
            stickySectionHeadersEnabled={false}
            keyExtractor={(item, index) => item._id + index}
            renderItem={renderFlatList}
            renderSectionHeader={renderSectionHeader}
            ListEmptyComponent={() => (
              <EmptyComponent />
            )}
            renderSectionFooter={() => (
              <View style={styles.footer} />
            )}
            contentContainerStyle={styles.sectionListContent}
          />
          :
          <CustomFlatList
            listStyle={styles.listStyle}
            ListEmptyComponent={() => (
              <EmptyComponent 
                title={'No Classes Found!'}
                desc={'Sorry we cannot find any registered class for you. Please contact your instructor.'}
                />
              )}

            data={filteredParticularDates}
            keyExtractor={(item) => item?._id?.toString()}
            renderItem={({ item }) => (
              <ClassDetailBox
                item={item}
                buttonText="Mark Attendance"
                onPress={() => navigation.navigate(Routes.EXCUSE_ATTENDANCE_DETAIL_SCREEN)}
                buttonDisableRequired={false}
              />
            )}
          />
      }
    </MainLayout>
  );
}

export default ExcuseAttandence;

