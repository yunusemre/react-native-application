import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Box from '../../components/ui/box';
import AppColors from '../../config/colors';
import mapJson from './map-style.json';

interface Locations {
  latitude: number;
  longitude: number;
  latitudeDelta?: number;
  longitudeDelta?: number;
}

const MappingScreen = ({ navigation }: any) => {
  const [, setRegion] = useState(null);
  const [updateLocation, setUpdateLocation] = useState(false);
  const [location, setLocation] = useState<Locations>({
    latitude: 40.9738116,
    longitude: 29.2536725,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.00921,
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      let loc: any = await Location.getCurrentPositionAsync({});
      setLocation({
        ...location,
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
      setUpdateLocation(true);
    })();
  }, []);

  return (
    <Box>
      {!updateLocation && (
        <Box justifyContent="center" alignItems="center" flex={1}>
          <ActivityIndicator size="large" color={AppColors.primary} />
        </Box>
      )}
      {updateLocation && (
        <MapView
          initialRegion={location}
          showsUserLocation={true}
          followsUserLocation={true}
          maxZoomLevel={20}
          onRegionChange={(region: any) => setRegion(region)}
          style={{ width: '100%', height: '100%' }}
          customMapStyle={mapJson}
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
      )}
    </Box>
  );
};

export default MappingScreen;
