import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { BarCodeScanner } from 'expo-barcode-scanner';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { useIsConnected } from 'react-native-offline';
import Box from '../../components/ui/box';
import Text from '../../components/ui/text';
import AppColors from '../../config/colors';
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
    try {
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
    } catch (error) {
      console.log('err', error);
    }
    setScanned(false);
    navigation.navigate('home');
  };

  if (hasPermission === null) {
    return (
      <Box justifyContent="center" alignItems="center" flex={1}>
        <ActivityIndicator size="large" color={AppColors.primary} />
      </Box>
    );
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <Box
      height={400}
      bg="black"
      flex={1}
      justifyContent="flex-end"
      alignItems="center"
      width={'100%'}
    >
      {isFocused ? (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={[StyleSheet.absoluteFillObject, styles.container]}
        />
      ) : null}
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
});
