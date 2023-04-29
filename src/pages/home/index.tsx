import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList } from 'react-native';
import { useIsConnected } from 'react-native-offline';
import Layout from '../../components/layout';
import Box from '../../components/ui/box';
import UiCard from '../../components/ui/card';
import UiEmpy from '../../components/ui/empty';
import { removeMoyListsOffline } from '../../store/features/app-slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

const HomeScreen = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const { moyListOffline } = useAppSelector((state) => state.app);
  const isConnected = useIsConnected();
  const windowSize: any = Dimensions.get('screen');
  const [refresh, setRefresh] = useState(false);
  const [data, setData] = useState([]);

  const getProducts = () => {
    if (isConnected) {
      setRefresh(true);
      axios
        .get('/barcode')
        .then((res: any) => {
          setData(res.data);
          setRefresh(false);
        })
        .catch((err) => setRefresh(false));
    }
  };

  const isOnline = () => {
    if (!!moyListOffline && moyListOffline?.length === 0) return;
    syncData(moyListOffline);
  };

  const syncData = async (offlineData: any) => {
    for (const data of offlineData) {
      console.log('home data', data);
      try {
        await axios.post('/barcode', data);
        dispatch(removeMoyListsOffline(data));
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getProducts();
    const unsubscribe = navigation.addListener('focus', () => getProducts());
    return unsubscribe;
  }, [navigation, isConnected]);

  return (
    <Layout isHeader openBarcode={() => navigation.navigate('barcode')}>
      <Box height={windowSize.height - 130}>
        <FlatList
          refreshing={refresh}
          onRefresh={() => {
            isOnline();
            getProducts();
          }}
          data={data}
          renderItem={({ item }: any) => <UiCard {...item} />}
          keyExtractor={(item: any) => item.id}
          ListEmptyComponent={
            <UiEmpy
              bg="primary"
              textType="white"
              mt={8}
              mb={4}
              ml={8}
              mr={8}
              p={8}
              text="Şu anda gösterilecek bir data bulunamadı."
            />
          }
        />
      </Box>
    </Layout>
  );
};

export default HomeScreen;
