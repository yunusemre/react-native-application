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
          height={195}
        >
          <Box flexDirection="row" p={3} justifyContent="space-between">
            <Text style={[globalStyle.w50, { fontSize: 10 }]}>Barcode No:</Text>
            <Text style={[globalStyle.w50, { fontSize: 10 }]}>
              {itemListDetail.CustomerBarcode}
            </Text>
          </Box>
          <Box bg="primary" flexDirection="row" p={3}>
            <Text style={[globalStyle.w50, globalStyle.bold, { fontSize: 10, color: 'white' }]}>
              Müşteri Beyanı
            </Text>
            <Text style={[globalStyle.w50, globalStyle.bold, { fontSize: 10, color: 'white' }]}>
              Kurye Ölçümü
            </Text>
          </Box>
          <Box flexDirection="row">
            <Box width={'50%'}>
              <Box flexDirection="row" p={2}>
                <Text style={[globalStyle.w50, { fontSize: 10 }]}>En:</Text>
                <Text style={[globalStyle.w50, globalStyle.bold, { fontSize: 10 }]}>
                  {itemListDetail.Width}
                </Text>
              </Box>
            </Box>
            <Box width={'50%'} flexDirection="row">
              <Box flexDirection="row" p={2}>
                <Text style={[globalStyle.w50, { fontSize: 10 }]}>En:</Text>
                <Text style={[globalStyle.w50, globalStyle.bold, { fontSize: 10 }]}>0.0</Text>
              </Box>
            </Box>
          </Box>
          <Box flexDirection="row">
            <Box width={'50%'} flexDirection="row" p={2}>
              <Text style={[globalStyle.w50, { fontSize: 10 }]}>Boy:</Text>
              <Text style={[globalStyle.w50, globalStyle.bold, { fontSize: 10 }]}>
                {itemListDetail.Length}
              </Text>
            </Box>
            <Box width={'50%'} flexDirection="row" p={2}>
              <Text style={[globalStyle.w50, { fontSize: 10 }]}>Boy:</Text>
              <Text style={[globalStyle.w50, globalStyle.bold, { fontSize: 10 }]}>0.0</Text>
            </Box>
          </Box>
          <Box flexDirection="row">
            <Box width={'50%'} flexDirection="row" p={2}>
              <Text style={[globalStyle.w50, { fontSize: 10 }]}>Yükseklik:</Text>
              <Text style={[globalStyle.w50, globalStyle.bold, { fontSize: 10 }]}>
                {itemListDetail.Height}
              </Text>
            </Box>
            <Box width={'50%'} flexDirection="row">
              <Box flexDirection="row" p={2}>
                <Text style={[globalStyle.w50, { fontSize: 10 }]}>Yükseklik:</Text>
                <Text style={[globalStyle.w50, globalStyle.bold, { fontSize: 10 }]}>12</Text>
              </Box>
            </Box>
          </Box>
          <Box flexDirection="row">
            <Box width={'50%'} flexDirection="row" p={2}>
              <Text style={[globalStyle.w50, { fontSize: 10 }]}>Desi:</Text>
              <Text style={[globalStyle.w50, globalStyle.bold, { fontSize: 10 }]}>
                {itemListDetail.Deci.toFixed(1)}
              </Text>
            </Box>
            <Box width={'50%'} flexDirection="row">
              <Box flexDirection="row" p={2}>
                <Text style={[globalStyle.w50, { fontSize: 10 }]}>Desi:</Text>
                <Text style={[globalStyle.w50, globalStyle.bold, { fontSize: 10 }]}>12</Text>
              </Box>
            </Box>
          </Box>
          <Box flexDirection="row">
            <Box width={'50%'}>
              <Box flexDirection="row" p={2}>
                <Text style={[globalStyle.w50, { fontSize: 10 }]}>Kilo:</Text>
                <Text style={[globalStyle.w50, globalStyle.bold, { fontSize: 10 }]}>
                  {itemListDetail.Weight}
                </Text>
              </Box>
            </Box>
            <Box width={'50%'} flexDirection="row">
              <Box flexDirection="row" p={2}>
                <Text style={[globalStyle.w50, { fontSize: 10 }]}>Kilo:</Text>
                <Text style={[globalStyle.w50, globalStyle.bold, { fontSize: 10 }]}>12</Text>
              </Box>
            </Box>
          </Box>
          <Box flexDirection="row">
            <Box width={'50%'} bg="primary">
              <Box flexDirection="row" p={2}>
                <Text style={[globalStyle.w50, { fontSize: 10, color: 'white' }]}>Tutar:</Text>
                <Text style={[globalStyle.w50, globalStyle.bold, { fontSize: 10, color: 'white' }]}>
                  {itemListDetail.UnitPrice}
                </Text>
              </Box>
            </Box>
            <Box width={'50%'} flexDirection="row" bg="color">
              <Box flexDirection="row" p={2}>
                <Text style={[globalStyle.w50, { fontSize: 10, color: 'white' }]}>Tutar:</Text>
                <Text style={[globalStyle.w50, globalStyle.bold, { fontSize: 10, color: 'white' }]}>
                  0.0
                </Text>
              </Box>
            </Box>
          </Box>
          <Box ml={-8}>
            <Checkbox.Android
              status={selected ? 'checked' : 'unchecked'}
              onPress={() => setSelected(!selected)}
            />
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
