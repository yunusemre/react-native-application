import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList } from 'react-native';
import { useIsConnected } from 'react-native-offline';
import { Chip, ProgressBar, Searchbar, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Layout from '../../components/layout';
import Box from '../../components/ui/box';
import UiCard from '../../components/ui/card';
import UiEmpy from '../../components/ui/empty';
import MoreButton from '../../components/ui/more-button';
import { removeOfflineList } from '../../utils';
import assignments from './assignment';

const HomeScreen = ({ navigation }: any) => {
  const isConnected = useIsConnected();
  const windowSize: any = Dimensions.get('screen');
  const [refresh, setRefresh] = useState(false);
  const [data, setData] = useState([]);
  const [showSearch, setShowSearch] = useState(false);

  const [show, setShow] = useState(false);
  const [selectedVal, setSelectedVal] = useState(assignments[0]);

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
      <Box ml={8} mr={8} mt={4}>
        <Box flexDirection="row" mb={2} width={'100%'}>
          <MoreButton
            style={{ width: '100%', justifyContent: 'center', flexGrow: 1 }}
            selected={(val: any) => {
              setSelectedVal(val);
              setShow(false);
            }}
            title={selectedVal?.name}
            data={assignments}
            openMenu={() => setShow(true)}
            show={show}
            closeMenu={() => setShow(false)}
          />

          <Chip
            style={{
              marginRight: 2,
            }}
            onPress={() => console.log('tatar')}
            mode="flat"
          >
            Gün Başlangıcı
          </Chip>
          <Chip
            style={{
              marginRight: 2,
            }}
            onPress={() => setShowSearch(!showSearch)}
            mode="flat"
          >
            <Icon name="search" />
          </Chip>
        </Box>
        {showSearch && (
          <Box>
            <Searchbar
              placeholder="Search"
              onChangeText={() => {}}
              value={''}
              inputStyle={{ marginTop: -8 }}
              style={{
                height: 40,
              }}
            />
          </Box>
        )}
        <Box mt={4}>
          <Box flexDirection="row" justifyContent="space-between" mb={8}>
            <Box as={Text} color="green" variant="labelMedium">
              Tamamlanan: 10
            </Box>
            <Box as={Text} color="red" variant="labelMedium">
              Tamamlanamayan: 10
            </Box>
          </Box>
          <ProgressBar progress={Math.random()} />
        </Box>
        <Box height={windowSize.height - 220}>
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
      </Box>
    </Layout>
  );
};

export default HomeScreen;
