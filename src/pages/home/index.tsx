import Layout from '@components/layout';
import { Box, Text } from '@components/ui';
import UiPicker from '@components/ui/select';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setShipmentsData } from '@store/features/shipment-slice';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { removeOfflineList } from '@utils/index';
import axios from 'axios';
import Constants from 'expo-constants';
import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, ScrollView } from 'react-native';
import { useIsConnected } from 'react-native-offline';
import { Button, ProgressBar, Searchbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { actions } from './actions';
import assignments from './assignment';
import Issues from './issues';

const HomeScreen = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const { location, isLogin } = useAppSelector((state) => state.apps);
  const { data } = useAppSelector((state) => state.shipments);
  const isConnected = useIsConnected();
  const { height }: { height: number } = Dimensions.get('screen');
  const [showSearch, setShowSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedIssue, setSelectedIsseu] = useState();
  const [selectedAction, setSelectedAction] = useState();
  const [search, setSearch] = useState('');
  const [dimentions, setDimentions] = useState(0);
  const [masterData, setMasterData] = useState<any[]>([]);

  const getProducts = async () => {
    setLoading(true);
    const body: any = {
      CurrentLocation: {
        Latitude: location.latitude || 23.4234,
        Longitude: location.longitude || 41.1213,
      },
      ShowAll: true,
    };
    const config = {
      url: '/getMyDailyJobs',
      method: 'post',
      data: body,
    };
    axios(config)
      .then((response: any) => {
        const Lists: any = response?.Payload?.StopList;
        setMasterData(Lists);
        dispatch(setShipmentsData(Lists));
        setLoading(false);
      })
      .catch(() => setLoading(false));
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
    getProducts();
  }, []);

  const findDimesions = useCallback((layout: any) => {
    const { height: layoutHeight } = layout;
    setDimentions(height - (layoutHeight + 40 + Constants.statusBarHeight + 60));
  }, []);

  const searchList = (text: string) => {
    setSearch(text);
    if (text) {
      const searchData = data.filter((obj) =>
        JSON.stringify(obj.TaskList).toLowerCase().includes(text.toLowerCase())
      );
      setMasterData(searchData);
    } else {
      setMasterData(data);
    }
  };

  const itemInformations = () => {
    return data?.reduce((first: any, item: any) => first + item.TaskList?.length, 0) || 0;
  };

  return (
    <Layout isHeader openBarcode={() => navigation.navigate('barcode')}>
      <Box ml={8} mr={8} mt={4}>
        <Box onLayout={(event: any) => findDimesions(event.nativeEvent.layout)}>
          <Box flexDirection="row" justifyContent="space-around" mb={2}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <UiPicker
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
              <Box
                as={Button}
                mode="outlined"
                mr={5}
                labelStyle={{
                  fontSize: 16,
                }}
                onPress={() => console.log('tatar')}
              >
                Gün Başlangıcı
              </Box>
              <Box as={Button} mr={5} mode="outlined" onPress={() => setShowSearch(!showSearch)}>
                <Icon name="search" size={16} />
              </Box>
            </ScrollView>
          </Box>
          {showSearch && (
            <Box mt={4} mb={4}>
              <Searchbar
                placeholder="Search"
                onChangeText={(val) => searchList(val)}
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
                Tamamlanan: {itemInformations()}
                {/* TaskListdeki taskstatus'a bakılacak */}
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
        <Issues
          onPress={() => console.log('blabla')}
          dimentions={dimentions}
          data={masterData}
          loading={loading}
          navigation={navigation}
          isOnline={isOnline}
          getProducts={getProducts}
          isConnected={isConnected}
        />
      </Box>
    </Layout>
  );
};

export default HomeScreen;
