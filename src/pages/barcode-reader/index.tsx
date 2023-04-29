import axios from 'axios';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera, CameraType } from 'expo-camera';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useIsConnected } from 'react-native-offline';
import uuid from '../../config/uuid';
import { setMoyListsOffline } from '../../store/features/app-slice';
import { useAppDispatch } from '../../store/hooks';

export default function BarcodeScreen({ navigation }: any) {
  const isConnected = useIsConnected();
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const dispatch = useAppDispatch();

  // const [hasPermission, setHasPermission] = useState<null | boolean>(null);

  // useEffect(() => {
  //   const getBarCodeScannerPermissions = async () => {
  //     const barcode: any = await BarCodeScanner.requestPermissionsAsync();
  //     setHasPermission(barcode.status === 'granted');
  //   };
  //   getBarCodeScannerPermissions();
  // }, []);

  useEffect(() => {
    requestPermission();
  }, []);

  const handleBarCodeScanned = async ({ _, data }: any) => {
    if (!isConnected) {
      const datas = { barcode: data, id: uuid(), date: Date.now() };
      console.log('offline data', datas);
      dispatch(setMoyListsOffline(datas));
    } else {
      // setScanned(true);
      await axios.post('/barcode', {
        barcode: data,
        id: uuid(),
        date: Date.now(),
      });
    }
    navigation.navigate('home');
  };

  // if (hasPermission === null) {
  //   return (
  //     <UiEmpy
  //       bg="warning"
  //       textType="color"
  //       mt={8}
  //       mb={4}
  //       ml={8}
  //       mr={8}
  //       p={8}
  //       text="Kameranın yetkisi için bekleniyor."
  //     />
  //   );
  // }
  // if (hasPermission === false) {
  //   return (
  //     <UiEmpy
  //       bg="warning"
  //       textType="color"
  //       mt={8}
  //       mb={4}
  //       ml={8}
  //       mr={8}
  //       p={8}
  //       text="Kamera erişim yetkisi yoktur."
  //     />
  //   );
  // }

  function toggleCameraType() {
    setType((current) => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  return (
    <View
      style={{
        flex: 1,
        overflow: 'hidden',
        justifyContent: 'center',
        alignContent: 'center',
      }}
    >
      {/* <Camera
        type={type}
        barCodeScannerSettings={{
          barCodeTypes: [
            BarCodeScanner.Constants.BarCodeType.ean13,
            BarCodeScanner.Constants.BarCodeType.ean8,
            BarCodeScanner.Constants.BarCodeType.upc_a,
            BarCodeScanner.Constants.BarCodeType.upc_e,
          ],
        }}
      /> */}
      <Camera
        style={styles.camera}
        type={type}
        barCodeScannerSettings={{
          barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
        }}
        onBarCodeScanned={handleBarCodeScanned}
      />

      {/* <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={[StyleSheet.absoluteFillObject]}
      /> */}
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
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
