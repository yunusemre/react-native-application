import Layout from '@components/layout';
import axios from 'axios';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Locations } from './map-model';
import mapJson from './map-style.json';

const MappingScreen = ({ route, navigation }: any) => {
  const timer = 60 * 60;
  const [location, setLocation] = useState<Locations>({
    latitude: route.params?.Latitude || 40.9738116,
    longitude: route.params?.Longitude || 29.2536725,
    latitudeDelta: 0.003,
    longitudeDelta: 0.002,
  });
  useEffect(() => {
    if (route.params !== undefined) return;
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

  const setLocationCoordinates = async () => {
    await axios.post('/coordinates', location);
  };

  useEffect(() => {
    const current = setInterval(() => setLocationCoordinates(), timer * 1000);
    return () => clearInterval(current);
  }, []);

  return (
    <Layout isHeader>
      <MapView
        ref={(mapRef) => mapRef?.fitToElements(true)}
        initialRegion={location}
        style={{ width: '100%', height: '100%' }}
        customMapStyle={mapJson}
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
          style={{ width: 35, height: 35 }}
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          icon={require('../../../assets/pin.png')}
          centerOffset={{ x: -28, y: -100 }}
          anchor={{ x: 0.5, y: 1.5 }}
        />
      </MapView>
    </Layout>
  );
};

export default MappingScreen;
