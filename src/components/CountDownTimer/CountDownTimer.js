import React, { useState, useEffect } from 'react'
import { View, Text, Alert, StyleSheet } from 'react-native'
import { Colors } from '../../assets'
import { CommonStyles, FontSize } from '../../utility'


const CountdownTimer = ({ setonCounterFinished }) => {
  const [seconds, setSeconds] = useState(180)
  

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prevSeconds => {
        if (prevSeconds <= 0) {
          clearInterval(timer); // Stop the timer if seconds reach 0
          return 0; // Optionally keep the display at 0
        }
        return prevSeconds - 1;
      });
    }, 1000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (seconds === 0) {
      setonCounterFinished(true)
      // Countdown has reached 0, do something here (e.g., show an alert)
     
    }
  }, [seconds])

  // Format the remaining seconds into MM:SS format
  const formattedTime = `${Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`

  return (
    <View>
      <Text style={styles.texStyle}>{formattedTime}</Text>
    </View>
  )
}

export default CountdownTimer
const styles = StyleSheet.create({
  texStyle: {
    fontSize: FontSize.VALUE(20),
  
    color: Colors.BLACK,
    textAlign: 'center',
    ...CommonStyles.REGULAR,
  },
})