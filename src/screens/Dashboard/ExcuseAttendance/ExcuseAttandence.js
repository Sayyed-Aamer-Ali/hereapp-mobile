import React, { useState, useEffect } from 'react';
import {
  Text, View, SectionList, StyleSheet,
  Alert
} from 'react-native';
import { ClassDetailBox, CustomFlatList, CustomizedInput, DatePickerComponent, EmptyComponent, ExcussedMissedClassTitle, Header, MainLayout, ScreenWrapper, } from '../../../components';
import Routes from '../../../navigation/Routes';
import styles from './styles';
import { useSelector,useDispatch } from 'react-redux';
import { Icons } from '../../../assets';
import { dummyExcuseData, particularDatesdummyExcuseData } from '../../../Data/DummyData';
import axiosWrapper from '../../../services/AxiosWrapper';
import { API_URLS } from '../../../services/apiPathList';
import { filterAndSortClassesByDate, filterAndSortClassesBySpecificDate } from '../../../utility/FormateDate';
import { setAllMissedClassesName } from '../../../redux/Reducers/TempData';

const ExcuseAttandence = ({ navigation }) => {

  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  const token = useSelector(state => state.auth.token);



const [allMissedClasses,setAllMissedClasses]=useState([]);



  const [selectedDate, setSelectedDate] = useState(null);
  const [loader, setLoader] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [search, setSearch] = useState({
    inputType: "text",
    value: "",
    type: "nonEditable",
    error: "",
    placeholder: "Search your missed class....",
    leftIcon: <Icons.SearchIcon />,
    onPress: () => {
      handleSearch();
    }
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
    setLoader(true);
    let baseUrl = API_URLS.FETCH_ALL_MISSED_CLASSES;
    try {
      let response = await axiosWrapper('GET', baseUrl, null, token, false, 'json', false);
  
      setAllMissedClasses(response.data);

      let filteroutNames = response.data.map((item) => {
        return item.classDetail.name;
      });
      let uniqueNames = [...new Set(filteroutNames)];
       
      dispatch(setAllMissedClassesName({
        AllMissedClassesName: uniqueNames,
        AllMissedClasses: response.data
      }));
     
      let data = filterAndSortClassesByDate(response.data);



      setDateSections([
        { index: 0, title: "Recently Missed Classes", data: [
          data.slice(0, 1)
        ] },
        { index: 1, title: "Request for a Particular Date", data: [] }
      ]);
      
    } catch (error) {
      
    }
    finally {
      setLoader(false);
    }

  }

  const renderSectionHeader = ({ section: { title, index } }) => {
    
    let paramTitle = index == 0 ? "Missed Classes" : "Particular Date";

  
    return (
      <>
        <ExcussedMissedClassTitle title={title}
          onPress={() => navigation.navigate(Routes.EXCUSE_ATTENDANCE_SECTION_SCREEN,
            { title:paramTitle, index,
              data:allMissedClasses,
              date: index === 1 ? selectedDate : null,
            
              
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
              
              maximumDate={new Date(new Date().setDate(new Date().getDate() - 1))}
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
          data={item}

          buttonText="Request Excused Absence"
          onPress={() => { navigation.navigate(Routes.EXCUSE_ATTENDANCE_DETAIL_SCREEN,{
            data:item,
          })} }
          buttonDisableRequired={true}
          schedule={item?.classDetail?.schedule[0]}
          dates={item?.attendanceStartedAt}
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

  const handleSearch = () => {
   
   navigation.navigate(Routes.SEARCH_SCREEN);
  }


  return (
    <MainLayout loader={loader}>
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
        
      
    </MainLayout>
  );
}

export default ExcuseAttandence;

