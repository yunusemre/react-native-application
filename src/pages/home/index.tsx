import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList } from 'react-native';
import { useIsConnected } from 'react-native-offline';
import Layout from '../../components/layout';
import Box from '../../components/ui/box';
import UiCard from '../../components/ui/card';
import UiEmpy from '../../components/ui/empty';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { removeMoyListsOffline } from '../../store/features/offline-slice';

const HomeScreen = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const { moyListOffline } = useAppSelector((state) => state.app);
  const isConnected = useIsConnected();
  const windowSize: any = Dimensions.get('screen');
  const [refresh, setRefresh] = useState(false);
  const [data, setData] = useState([]);

  const getProducts = async () => {
    if (!isConnected) return;
    await axios
      .get('/barcode')
      .then((res: any) => {
        setData(res.data);
        setRefresh(false);
      })
      .catch((err) => setRefresh(false));
  };

  const isOnline = async () => {
    if (!isConnected && !!moyListOffline && moyListOffline?.length === 0) return;
    await syncData(moyListOffline);
  };

  const syncData = async (offlineData: any) => {
    setRefresh(true);
    for (const data of offlineData) {
      try {
        await axios.post('/barcode', data);
        dispatch(removeMoyListsOffline(data));
      } catch (error) {
        setRefresh(false);
        console.error(error);
      }
    }
    setRefresh(false);
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
          onRefresh={async () => {
            await isOnline();
            await getProducts();
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
