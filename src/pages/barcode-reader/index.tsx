import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { BarCodeScanner } from 'expo-barcode-scanner';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useIsConnected } from 'react-native-offline';
import Text from '../../components/ui/text';
import uuid from '../../config/uuid';
import { setMoyListsOffline } from '../../store/features/offline-slice';
import { useAppDispatch } from '../../store/hooks';

export default function BarcodeScreen({ navigation }: any) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const dispatch = useAppDispatch();
  const isConnected = useIsConnected();
  const isFocused = useIsFocused();

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({ _, data }: any) => {
    setScanned(true);
    if (isConnected) {
      await axios.post('/barcode', {
        barcode: data,
        id: uuid(),
        date: Date.now(),
      });
    } else {
      const datas = { barcode: data, id: uuid(), date: Date.now() };
      dispatch(setMoyListsOffline(datas));
    }
    setScanned(false);
    navigation.navigate('home');
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.wrapper}>
      <Text>isConnected:{JSON.stringify(isConnected)}</Text>
      {isFocused ? (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={[StyleSheet.absoluteFillObject, styles.container]}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    backgroundColor: 'black',
    flex: 1,
    justifyContent: 'flex-end',
    alignContent: 'center',
    width: '100%',
    height: 300,
    overflow: 'hidden',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
});
