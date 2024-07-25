;
import { View, StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { mapStyle } from './mapsStyleTrip';

const MapComponent = ({ marker }) => {
  const initialRegion = {
    latitude: marker.latitude,
    longitude: marker.longitude,
    latitudeDelta: 0.0122,
    longitudeDelta: 0.0021,
  }
  
  return (
    <MapView
      customMapStyle={mapStyle}
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      initialRegion={initialRegion}
    >

      <Marker
        coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
        title={marker.title}
        description={marker.description}
      />

    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 1
  },
});

export default MapComponent;
