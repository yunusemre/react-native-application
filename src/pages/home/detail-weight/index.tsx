import Layout from '@components/layout';
import { Box, Text } from '@components/ui';
import { useAppSelector } from '@store/hooks';
import { globalStyle } from '@utils/global-style';
import { useState } from 'react';
import { Button, Checkbox } from 'react-native-paper';

export const HomeDetailWeights = ({ route }: any) => {
  const itemListDetail: any = route.params;
  const { screenHeight } = useAppSelector((state) => state.apps);
  const [selected, setSelected] = useState(false);
  return (
    <Layout isHeader isBottom hasBack={true}>
      <Box height={screenHeight - 70}>
        <Box
          border={1}
          borderColor="borderColor"
          borderRadius={8}
          color="white"
          bg="white"
          p={8}
          m={8}
        >
          <Box flexDirection="row" p={3} justifyContent="space-between">
            <Text style={[globalStyle.w50, globalStyle.bold]}>Barcode No:</Text>
            <Text style={[globalStyle.w50, globalStyle.bold]}>
              {itemListDetail.CustomerBarcode}
            </Text>
          </Box>
          <Box flexDirection="row">
            <Box bg="primary" width={'50%'} p={3}>
              <Text style={[globalStyle.w50, globalStyle.bold, { fontSize: 12, color: 'white' }]}>
                Müşteri Beyanı
              </Text>
            </Box>
            <Box bg="color" width={'50%'} p={3}>
              <Text style={[globalStyle.w50, globalStyle.bold, { fontSize: 12, color: 'white' }]}>
                Kurye Ölçümü
              </Text>
            </Box>
          </Box>
          <Box flexDirection="row">
            <Box width={'50%'}>
              <Box flexDirection="row" p={2}>
                <Text style={[globalStyle.w50]}>En:</Text>
                <Text style={[globalStyle.w50, globalStyle.bold]}>{itemListDetail.Width}</Text>
              </Box>
            </Box>
            <Box width={'50%'} flexDirection="row">
              <Box flexDirection="row" p={2}>
                <Text style={[globalStyle.w50]}>En:</Text>
                <Text style={[globalStyle.w50, globalStyle.bold]}>0.0</Text>
              </Box>
            </Box>
          </Box>
          <Box flexDirection="row">
            <Box width={'50%'} flexDirection="row" p={2}>
              <Text style={[globalStyle.w50]}>Boy:</Text>
              <Text style={[globalStyle.w50, globalStyle.bold]}>{itemListDetail.Length}</Text>
            </Box>
            <Box width={'50%'} flexDirection="row" p={2}>
              <Text style={[globalStyle.w50]}>Boy:</Text>
              <Text style={[globalStyle.w50, globalStyle.bold]}>0.0</Text>
            </Box>
          </Box>
          <Box flexDirection="row">
            <Box width={'50%'} flexDirection="row" p={2}>
              <Text style={[globalStyle.w50]}>Yükseklik:</Text>
              <Text style={[globalStyle.w50, globalStyle.bold]}>{itemListDetail.Height}</Text>
            </Box>
            <Box width={'50%'} flexDirection="row">
              <Box flexDirection="row" p={2}>
                <Text style={[globalStyle.w50]}>Yükseklik:</Text>
                <Text style={[globalStyle.w50, globalStyle.bold]}>0.0</Text>
              </Box>
            </Box>
          </Box>
          <Box flexDirection="row">
            <Box width={'50%'} flexDirection="row" p={2}>
              <Text style={[globalStyle.w50]}>Desi:</Text>
              <Text style={[globalStyle.w50, globalStyle.bold]}>
                {itemListDetail.Deci.toFixed(1)}
              </Text>
            </Box>
            <Box width={'50%'} flexDirection="row">
              <Box flexDirection="row" p={2}>
                <Text style={[globalStyle.w50]}>Desi:</Text>
                <Text style={[globalStyle.w50, globalStyle.bold]}>0.0</Text>
              </Box>
            </Box>
          </Box>
          <Box flexDirection="row">
            <Box width={'50%'}>
              <Box flexDirection="row" p={2}>
                <Text style={[globalStyle.w50]}>Kilo:</Text>
                <Text style={[globalStyle.w50, globalStyle.bold]}>{itemListDetail.Weight}</Text>
              </Box>
            </Box>
            <Box width={'50%'} flexDirection="row">
              <Box flexDirection="row" p={2}>
                <Text style={[globalStyle.w50]}>Kilo:</Text>
                <Text style={[globalStyle.w50, globalStyle.bold]}>0.0</Text>
              </Box>
            </Box>
          </Box>
          <Box flexDirection="row">
            <Box width={'50%'} bg="primary">
              <Box flexDirection="row" p={2}>
                <Text style={[globalStyle.w50, globalStyle.bold, { color: 'white' }]}>Tutar:</Text>
                <Text style={[globalStyle.w50, globalStyle.bold, { color: 'white' }]}>
                  {itemListDetail.UnitPrice}
                </Text>
              </Box>
            </Box>
            <Box width={'50%'} flexDirection="row" bg="color">
              <Box flexDirection="row" p={2}>
                <Text style={[globalStyle.w50, globalStyle.bold, { color: 'white' }]}>Tutar:</Text>
                <Text style={[globalStyle.w50, globalStyle.bold, { color: 'white' }]}>0.0</Text>
              </Box>
            </Box>
          </Box>
          <Box flexDirection="row">
            <Box ml={-8}>
              <Checkbox.Android
                status={selected ? 'checked' : 'unchecked'}
                onPress={() => setSelected(!selected)}
              />
            </Box>
            <Box>
              <Button icon="attachment" onPress={() => console.log('bla')} />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box height={40} flexDirection="row" justifyContent="space-between" pl={9} pr={8}>
        <Button disabled={!selected} style={{ width: '100%' }} mode="contained" onPress={() => {}}>
          Kayıp Bildir
        </Button>
      </Box>
    </Layout>
  );
};
