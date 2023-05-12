import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList } from 'react-native';
import { useIsConnected } from 'react-native-offline';
import Layout from '../../components/layout';
import Box from '../../components/ui/box';
import UiCard from '../../components/ui/card';
import UiEmpy from '../../components/ui/empty';
import { removeOfflineList } from '../../utils';
import assignments from './assignment';

const HomeScreen = ({ navigation }: any) => {
  const isConnected = useIsConnected();
  const windowSize: any = Dimensions.get('screen');
  const [refresh, setRefresh] = useState(false);
  const [data, setData] = useState([]);
  const [showMenu, setShowMenu] = useState(true);

  const firstSelectedItem: any = assignments[0];
  const [selectedIssue, setSelectedIssue] = useState(firstSelectedItem);

  const getProducts = async () => {
    await axios
      .get('/barcode')
      .then((res: any) => {
        setData(res.data);
        setRefresh(false);
      })
      .catch((err) => setRefresh(false));
  };

  const isOnline = async () => {
    const offline: any = (await AsyncStorage.getItem('@offline')) || '[]';
    const parseOffline: any = JSON.parse(offline);
    if (parseOffline?.length === 0) return;
    await syncData(parseOffline);
  };

  const syncData = async (offlineData: any) => {
    setRefresh(true);
    for (const data of offlineData) {
      try {
        await axios.post('/barcode', data);
        await removeOfflineList(data);
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
  }, [navigation]);

  return (
    <Layout isHeader openBarcode={() => navigation.navigate('barcode')}>
      {/* <Box flexDirection="row" justifyContent="space-around" flexGap={10} m={8}>
        <Menu
          visible={showMenu}
          onDismiss={() => setShowMenu(false)}
          anchor={
            <Button icon="dots-vertical" mode="outlined" onPress={() => setShowMenu(!showMenu)}>
              {selectedIssue.name}
            </Button>
          }
        >
          {assignments.map((item: any) => (
            <Menu.Item
              key={item.name}
              onPress={() => {
                setSelectedIssue(item);
                setShowMenu(false);
              }}
              title={item.name}
            />
          ))}
        </Menu>
        <Button icon="check" mode="outlined" onPress={() => console.log('Pressed')}>
          Gün Başlangıcı
        </Button>
      </Box>
      <Box mb={4} mr={8} ml={8} mt={8} pl={2} pr={2}>
        <ProgressBar progress={Math.random()} />
      </Box> */}
      <Box height={windowSize.height - 130}>
        <FlatList
          refreshing={refresh}
          onRefresh={async () => {
            if (isConnected) {
              await isOnline();
              await getProducts();
            }
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
