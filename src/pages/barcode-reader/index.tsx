import Layout from '@components/layout';
import { Box } from '@components/ui';
import theme from '@config/index';
import { useIsFocused } from '@react-navigation/native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { AutoFocus, Camera, FlashMode } from 'expo-camera';
import React, { useState } from 'react';
import { useIsConnected } from 'react-native-offline';
import { IconButton } from 'react-native-paper';

export default function BarcodeScreen({ navigation }: any) {
  const [scanned, setScanned] = useState(false);
  const [flashMode, setFlashMode] = useState(FlashMode.off);
  const isConnected = useIsConnected();
  const isFocused = useIsFocused();

  const handleBarCodeScanned = async ({ _, data }: any) => {
    setScanned(true);
    // try {
    //   if (isConnected) {
    //     await axios.post('/barcode', {
    //       barcode: data,
    //       id: 1,
    //       date: Date.now(),
    //       color: true,
    //     });
    //   } else {
    //     const datas: any = { barcode: data, id: 1, date: Date.now() };
    //     AsyncStorage.setItem('@offline', JSON.stringify(datas));
    //   }
    // } catch (error) {
    //   console.log('err', error);
    // }
    setScanned(false);
    navigation.navigate('home');
  };

  return (
    <Layout isHeader>
      <Box>
        {isFocused ? (
          <Camera
            style={{ width: '100%', height: '100%' }}
            ratio={'16:9'}
            autoFocus={AutoFocus.on}
            flashMode={flashMode}
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            barCodeScannerSettings={{
              barCodeTypes: [
                BarCodeScanner.Constants.BarCodeType.ean13,
                BarCodeScanner.Constants.BarCodeType.ean8,
                BarCodeScanner.Constants.BarCodeType.upc_a,
                BarCodeScanner.Constants.BarCodeType.upc_e,
              ],
            }}
          >
            <IconButton
              icon="flash"
              style={{
                position: 'absolute',
                right: 0,
                top: 40,
                borderWidth: 1,
                borderColor: flashMode === FlashMode.off ? 'transparent' : theme.colors.warning,
              }}
              iconColor={flashMode === FlashMode.off ? null : theme.colors.warning}
              size={30}
              onPress={() => {
                if (flashMode === FlashMode.torch) {
                  setFlashMode(FlashMode.off);
                } else {
                  setFlashMode(FlashMode.torch);
                }
              }}
            />
          </Camera>
        ) : null}
      </Box>
    </Layout>
  );
}
