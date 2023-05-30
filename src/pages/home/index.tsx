import Layout from '@components/layout';
import { Box, Text } from '@components/ui';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setShipmentsData } from '@store/features/shipment-slice';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import axios from 'axios';
import Constants from 'expo-constants';
import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, ScrollView } from 'react-native';
import { useIsConnected } from 'react-native-offline';
import { Checkbox } from 'react-native-paper';
import Issues from './issues';

const HomeScreen = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const { location } = useAppSelector((state) => state.apps);
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
        setMasterData(response?.Payload?.StopList);
        dispatch(setShipmentsData(response?.Payload?.StopList));
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
    console.log('offlineData', offlineData);
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
            <ScrollView horizontal showsHorizontalScrollIndicator={false}></ScrollView>
          </Box>
        </Box>
        <Box
          border={1}
          borderColor="borderColor"
          borderRadius={8}
          mb={8}
          pt={4}
          pb={4}
          color="white"
          flexDirection="row"
          alignItems="center"
          height={40}
        >
          <Checkbox status="unchecked" onPress={() => {}} />
          <Text>Tümünü Seç</Text>
        </Box>
        <Issues
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
