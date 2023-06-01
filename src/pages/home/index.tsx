import Layout from '@components/layout';
import { Box, Text, UiPicker } from '@components/ui';
import theme from '@config/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setShipmentsData } from '@store/features/shipment-slice';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import axios from 'axios';
import Constants from 'expo-constants';
import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, ScrollView } from 'react-native';
import { useIsConnected } from 'react-native-offline';
import { ProgressBar, Searchbar } from 'react-native-paper';
import assignments from './assignment';
import { TaskStatusEnum } from './card/status';
import Issues from './issues';

const HomeScreen = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const { location } = useAppSelector((state) => state.apps);
  const { data } = useAppSelector((state) => state.shipments);
  const isConnected = useIsConnected();
  const { height, width }: { height: number; width: number } = Dimensions.get('window');
  const [showSearch, setShowSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedIssue, setSelectedIsseu] = useState();
  const [selectedAction, setSelectedAction] = useState();
  const [search, setSearch] = useState('');
  const [dimentions, setDimentions] = useState(0);
  const [masterData, setMasterData] = useState<any[]>([]);

  const [totalCount, setTotalCount] = useState(0);
  const [completeCount, setCompleteCount] = useState(0);
  const [percent, setPercent] = useState(0);

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
        const result = response?.Payload?.StopList;
        setMasterData(result);
        dispatch(setShipmentsData(result));

        //  Task Item Total Count
        const total =
          result?.reduce((first: any, item: any) => first + item.TaskList?.length, 0) || 0;
        setTotalCount(total);
        //  Task Item Completed Count
        let totalCompletedCount = 0;
        result?.forEach((task: any) => {
          task.TaskList.map((taskItem: any) => {
            const taskStatusId = taskItem.TaskStatus;
            if (
              taskStatusId === TaskStatusEnum.COMPLETED ||
              taskStatusId === TaskStatusEnum.CANCELLED
            ) {
              totalCompletedCount++;
            }
          }, 0);
        });
        setCompleteCount(totalCompletedCount);
        setPercent(Math.ceil((totalCompletedCount / total) * 100));
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
    setDimentions(
      height - (layoutHeight + Constants.statusBarHeight + Constants.statusBarHeight + 94)
    );
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

  return (
    <Layout isHeader isBottom openBarcode={() => navigation.navigate('barcode')}>
      <Box ml={8} mr={8} mt={4}>
        <Box onLayout={(event: any) => findDimesions(event.nativeEvent.layout)}>
          <Box flexDirection="row" height={40} mb={4}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <UiPicker
                style={{ width: width / 2 - 4, marginTop: -6 }}
                items={assignments}
                selectedValue={selectedIssue}
                onValueChange={(val: any) => setSelectedIsseu(val)}
              />
              <Box
                borderWidth={1}
                borderRadius={theme.radius.normal}
                borderColor={theme.colors.default}
                bg="white"
                pl={4}
                pr={4}
                mr={4}
                width={width / 2 - 16}
                justifyContent="center"
              >
                <Text color="info">Takım lideri onayı bekleniyor</Text>
              </Box>
              <Searchbar
                style={{
                  width: width / 2 - 16,
                  borderRadius: theme.radius.normal,
                  borderBottomWidth: 0,
                }}
                inputStyle={{ marginTop: -17, borderBottomWidth: 0 }}
                mode="view"
                placeholder="Search"
                onChangeText={(val) => searchList(val)}
                value={search}
              />
            </ScrollView>
          </Box>
          <Box height={34}>
            <Box flexDirection="row" justifyContent="space-between" mb={8}>
              <Box as={Text} variant="labelMedium">
                Tamamlanma Oranı: {completeCount}/{totalCount}
              </Box>
              <Box as={Text} variant="labelMedium">
                {percent} %
              </Box>
            </Box>
            <ProgressBar progress={percent / 100} />
          </Box>
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
