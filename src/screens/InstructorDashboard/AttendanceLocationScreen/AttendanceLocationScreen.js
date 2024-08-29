import { StatusBar, View, Text } from 'react-native'
import React from 'react'
import styles from './styles'
import { Button, Header, MapComponent } from '../../../components'
import { Colors, Icons } from '../../../assets'


const AttendanceLocationScreen = ({ navigation, route }) => {

    let location = route.params.location;
    let name  = route.params.name;
    let schoolNmae = route.params.schoolName;


    const marker = {
        latitude: location?.lat,
        longitude: location?.lng,
        title: name,
    
    }

    return (
        <View style={styles.container}>
            <StatusBar translucent={true} backgroundColor={'transparent'} />
            <View style={styles.headerContainer} >
                <Header
                    title={"Location"}
                    showBackButton={true}
                    DrawerHeader={false}
                />
            </View>

            <MapComponent
                marker={marker} />

            
            <View style={styles.footerContainer}>
                <Text style={styles.footerTitle}>
                    {name}
                </Text>
                <Text style={styles.footerLocation}>
                    {schoolNmae}
                </Text>
            <Button
                text={"Go Back"}
                LeftIcon={<Icons.ArrowBack />}
                style={styles.button}
                textStyle={styles.textStyle}
                onPress={() => navigation.goBack()}
            />
            </View>

        </View>
    )
}

export default AttendanceLocationScreen

