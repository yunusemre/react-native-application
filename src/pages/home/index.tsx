import Layout from '@components/layout';
import { Box, Text, UiCard, UiEmpy } from '@components/ui';
import UiPicker from '@components/ui/select';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setShipmentsData } from '@store/features/shipment-slice';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { removeOfflineList } from '@utils/index';
import axios from 'axios';
import Constants from 'expo-constants';
import React, { useEffect, useState } from 'react';
import { Dimensions, RefreshControl, ScrollView } from 'react-native';
import { useIsConnected } from 'react-native-offline';
import { ActivityIndicator, Button, ProgressBar, Searchbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { actions } from './actions';
import assignments from './assignment';

const HomeScreen = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const { location, isLogin } = useAppSelector((state) => state.apps);
  const { data, loading } = useAppSelector((state) => state.shipments);
  const isConnected = useIsConnected();
  const { height }: { height: number } = Dimensions.get('screen');
  const [showSearch, setShowSearch] = useState(false);
  const [selectedIssue, setSelectedIsseu] = useState();
  const [selectedAction, setSelectedAction] = useState();
  const [search, setSearch] = useState('');
  const [count, setCount] = useState(0);
  const [dimentions, setDimentions] = useState(0);

  const getProducts = async () => {
    const body: any = {
      CurrentLocation: {
        Latitude: 23.4234,
        Longitude: 41.1213,
      },
      ShowAll: true,
    };
    const config = {
      url: '/getMyDailyJobs',
      method: 'post',
      data: body,
    };
    axios(config).then((response: any) => {
      const Lists: any = response?.Payload?.StopList;
      dispatch(setShipmentsData(Lists));
    });
  };

  const isOnline = async () => {
    const offline: any = await AsyncStorage.getItem('@offline');
    if (offline === null) return;
    const parseOffline: any = JSON.parse(offline);
    if (parseOffline?.length === 0) return;
    await syncData(parseOffline);
  };

  const syncData = async (offlineData: any) => {
    for (const data of offlineData) {
      try {
        await axios.post('/barcode', data);
        await removeOfflineList(data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (!isLogin) return;
    getProducts();
  }, [location]);

  const find_dimesions = (layout: any) => {
    const { height: layoutHeight } = layout;
    setDimentions(height - (layoutHeight + 40 + Constants.statusBarHeight + 60));
  };

  return (
    <Layout isHeader openBarcode={() => navigation.navigate('barcode')}>
      <Box ml={8} mr={8} mt={4}>
        <Box onLayout={(event: any) => find_dimesions(event.nativeEvent.layout)}>
          <Box flexDirection="row" justifyContent="space-around" mb={2}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <UiPicker
                mode="dropdown"
                minWidth={160}
                items={assignments}
                selectedValue={selectedIssue}
                onValueChange={(val: any) => setSelectedIsseu(val)}
              />
              <UiPicker
                minWidth={160}
                items={actions}
                selectedValue={selectedAction}
                onValueChange={(val: any) => setSelectedAction(val)}
              />
              <Button
                mode="outlined"
                style={{
                  marginRight: 5,
                }}
                onPress={() => console.log('tatar')}
              >
                Gün Başlangıcı
              </Button>
              <Button
                style={{
                  marginRight: 5,
                }}
                mode="outlined"
                onPress={() => setShowSearch(!showSearch)}
              >
                <Icon name="search" />
              </Button>
            </ScrollView>
          </Box>
          {showSearch && (
            <Box mt={4} mb={4}>
              <Searchbar
                placeholder="Search"
                onChangeText={(val) => console.log(val)}
                value={search}
                inputStyle={{ marginTop: -8 }}
                style={{
                  height: 40,
                }}
              />
            </Box>
          )}
          <Box mt={4} mb={4}>
            <Box flexDirection="row" justifyContent="space-between" mb={8}>
              <Box as={Text} color="green" variant="labelMedium">
                Tamamlanan: 10
              </Box>
              <Box as={Text} color="green" variant="labelMedium">
                <Text>{Math.ceil(40.3848)}%</Text>
              </Box>
              <Box as={Text} color="danger" variant="labelMedium">
                Tamamlanamayan: 6
              </Box>
            </Box>
            <ProgressBar progress={Math.random()} />
          </Box>
        </Box>
        <Box height={dimentions}>
          {loading && (
            <UiEmpy
              bg="white"
              textType="primary"
              mt={8}
              mb={8}
              p={8}
              text={
                <Box flexDirection="row" justifyContent="center">
                  <ActivityIndicator />
                  <Text ml={10}>Şu anda işlem gerçekleştiriliyor...</Text>
                </Box>
              }
            />
          )}
          {loading === false && data.length === 0 && (
            <UiEmpy
              bg="warning"
              textType="textColor"
              mt={8}
              mb={8}
              p={8}
              text={
                <Box flexDirection="row">
                  <ActivityIndicator />
                  <Text ml={10}>Gösterilecek bir data yok.</Text>
                </Box>
              }
            />
          )}
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={async () => {
                  if (isConnected) {
                    await isOnline();
                    await getProducts();
                  }
                }}
              />
            }
          >
            {data?.map((response: any) => {
              return response.TaskList?.map((item: any, index: number) => (
                <UiCard key={index} index={index + 1} navigation={navigation} {...item} />
              ));
            })}
          </ScrollView>
        </Box>
      </Box>
    </Layout>
  );
};

export default HomeScreen;
