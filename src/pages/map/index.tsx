import React, { useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Box from '../../components/ui/box';
import mapJson from './map-style.json';

const MappingScreen = () => {
  const [, setRegion] = useState(null);

  const initialObject = {
    latitude: 40.9738116,
    longitude: 29.2536725,
  };
  return (
    <Box>
      <MapView
        initialRegion={{
          ...initialObject,
          latitudeDelta: 0.44,
          longitudeDelta: 0.45,
        }}
        maxZoomLevel={20}
        onRegionChange={(region: any) => setRegion(region)}
        style={{ width: '100%', height: '100%' }}
        customMapStyle={mapJson}
        provider={PROVIDER_GOOGLE}
      >
        <Marker
          testID="marker"
          draggable
          coordinate={initialObject}
          description="Kardelen Ekol"
          title="Ekol Lojistik"
        />
      </MapView>
    </Box>
  );
};

export default MappingScreen;
