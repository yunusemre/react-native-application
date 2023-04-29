import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { AutoFocus, Camera, CameraType, FlashMode } from 'expo-camera';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useIsConnected } from 'react-native-offline';
import uuid from '../../config/uuid';
import { setMoyListsOffline } from '../../store/features/app-slice';
import { useAppDispatch } from '../../store/hooks';

export default function BarcodeScreen({ navigation }: any) {
  const isConnected = useIsConnected();
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();

  const handleBarCodeScanned = async ({ _, data }: any) => {
    if (!isConnected) {
      const datas = { barcode: data, id: uuid(), date: Date.now() };
      console.log('offline data', datas);
      dispatch(setMoyListsOffline(datas));
    } else {
      await axios.post('/barcode', {
        barcode: data,
        id: uuid(),
        date: Date.now(),
      });
    }
    navigation.navigate('home');
  };

  const onCameraReady = () => {
    console.log('camera ready');
  };

  return (
    <View
      style={{
        flex: 1,
        overflow: 'hidden',
        justifyContent: 'center',
        alignContent: 'center',
      }}
    >
      {isFocused ? (
        <Camera
          autoFocus={AutoFocus.on}
          flashMode={FlashMode.torch}
          zoom={0.05}
          onCameraReady={onCameraReady}
          style={styles.camera}
          type={CameraType.back}
          onBarCodeScanned={handleBarCodeScanned}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
});
