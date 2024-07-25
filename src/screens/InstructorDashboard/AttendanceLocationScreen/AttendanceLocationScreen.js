import { StatusBar, View, Text } from 'react-native'
import React from 'react'
import styles from './styles'
import { Button, Header, MapComponent } from '../../../components'
import { Colors, Icons } from '../../../assets'


const AttendanceLocationScreen = ({ navigation, route }) => {

    const marker = {
        latitude: 31.4698,
        longitude: 74.3185,
        title: 'Marker 1',
        description: 'This is marker 1',
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
                <Text style={styles.footerTitle}>Attendance Location:</Text>
                <Text style={styles.footerLocation}>Harvard University, Harvard Square, New York, USA</Text>
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

