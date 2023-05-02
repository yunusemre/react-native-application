import axios from 'axios';
import { BarCodeScanner } from 'expo-barcode-scanner';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { useIsConnected } from 'react-native-offline';
import uuid from '../../config/uuid';
import { setMoyListsOffline } from '../../store/features/app-slice';
import { useAppDispatch } from '../../store/hooks';

export default function BarcodeScreen({ navigation }: any) {
  const isConnected = useIsConnected();
  const dispatch = useAppDispatch();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const handleBarCodeScanned = async ({ _, data }: any) => {
    if (!isConnected) {
      const datas = { barcode: data, id: uuid(), date: Date.now() };
      dispatch(setMoyListsOffline(datas));
    } else {
      await axios.post('/barcode', {
        barcode: data,
        id: uuid(),
        date: Date.now(),
      });
    }
    navigation.navigate('home');
    setScanned(true);
  };

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const barcode: any = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(barcode.status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  return (
    <View style={styles.wrapper}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    overflow: 'hidden',
    justifyContent: 'center',
    alignContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
});
