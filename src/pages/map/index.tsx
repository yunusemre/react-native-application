import axios from 'axios';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Box from '../../components/ui/box';
import { Locations } from './map-model';
import mapJson from './map-style.json';

const MappingScreen = () => {
  const [location, setLocation] = useState<Locations>({
    latitude: 40.9738116,
    longitude: 29.2536725,
    latitudeDelta: 0.003,
    longitudeDelta: 0.003,
  });
  useEffect(() => {
    (async () => {
      try {
        const location: any = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        let cor: any = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        setLocation({
          ...location,
          ...cor,
        });
      } catch (error) {}
    })();
  }, [location]);

  useEffect(() => {
    const current = setInterval(() => {
      axios.post('/coordinates', location);
    }, 60 * 1000);
    return () => clearInterval(current);
  }, []);

  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <MapView
        ref={(mapRef) => mapRef?.fitToElements(true)}
        initialRegion={location}
        style={StyleSheet.absoluteFill}
        customMapStyle={mapJson}
        showsUserLocation={true}
        showsMyLocationButton={true}
        followsUserLocation={true}
        showsCompass={true}
        scrollEnabled={true}
        zoomEnabled={true}
        pitchEnabled={true}
        provider={PROVIDER_GOOGLE}
      >
        <Marker
          testID="marker"
          draggable
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
        />
      </MapView>
    </Box>
  );
};

export default MappingScreen;
