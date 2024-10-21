import { StyleSheet, View,Text } from 'react-native'
import React from 'react'
import { Colors, Icons } from '../../assets'
import { UtilityMethods } from '../../utility'

const NotificationsIcon = ({ notifications }) => {
    return (
        <View style={styles.container}>
            {notifications > 0 &&
                    <View style={styles.dot} />

            }
            <View >
                <Icons.Notifications />
            </View>
        </View>
    )
}

export default NotificationsIcon

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    dot: {
        position: 'absolute',
        width: UtilityMethods.wp(1.5),
        height: UtilityMethods.wp(1.5),
        borderRadius: UtilityMethods.wp(1),
        backgroundColor: Colors.RED,
        zIndex: 1,
        right: UtilityMethods.wp(1.5),
        top: UtilityMethods.wp(0.6)
    },
    notificationShadow: {
        shadowColor: Colors.BLACK,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        borderRadius: 50,
        elevation: 5,
    },
})