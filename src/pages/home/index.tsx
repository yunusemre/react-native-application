import Layout from '@components/layout';
import { Box, Text, UiPicker } from '@components/ui';
import theme from '@config/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setShipmentsData } from '@store/features/shipment-slice';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { dailyMissionStatusText } from '@utils/daily-mission-status';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView } from 'react-native';
import { useIsConnected } from 'react-native-offline';
import { ProgressBar, Searchbar } from 'react-native-paper';
import assignments from './assignment';
import { TaskStatusEnum } from './card/status';
import Issues from './issues';

const HomeScreen = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const { location, screenHeight } = useAppSelector((state) => state.apps);
  const { data } = useAppSelector((state) => state.shipments);
  const isConnected = useIsConnected();
  const { width }: { width: number } = Dimensions.get('screen');
  const [loading, setLoading] = useState(false);
  const [selectedIssue, setSelectedIsseu] = useState();
  const [search, setSearch] = useState('');
  const [masterData, setMasterData] = useState<any[]>([]);

  const [totalCount, setTotalCount] = useState(0);
  const [completeCount, setCompleteCount] = useState(0);
  const [percent, setPercent] = useState(0);
  const [checkListItem, setCheckListItem] = useState({});
  const [dailyMissionStatus, setDailyMissionStatus] = useState<number>(1);

  const checkList: any = {};

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
        setDailyMissionStatus(response?.Payload.DailyMissionStatus);
        const result = response?.Payload?.StopList;
        setMasterData(result);
        dispatch(setShipmentsData(result));

        const total = result?.reduce((first: any, item: any) => first + item.TaskList?.length, 0);
        setTotalCount(total);
        //  Task Item Completed Count
        let totalCompletedCount = 0;
        result?.forEach((task: any) => {
          task.TaskList.map((taskItem: any) => {
            checkList[taskItem.TaskId] = false;
            const taskStatusId = taskItem.TaskStatus;
            if (
              taskStatusId === TaskStatusEnum.COMPLETED ||
              taskStatusId === TaskStatusEnum.CANCELLED
            ) {
              totalCompletedCount++;
            }
          });
        });
        setCheckListItem(checkList);
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

  const layoutHeight = screenHeight - 84;
  return (
    <Layout isHeader isBottom openBarcode={() => navigation.navigate('barcode')}>
      <Box ml={8} mr={8} mt={4}>
        <Box height={80}>
          <Box flexDirection="row" height={40} mb={4}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <UiPicker
                style={{ width: width / 2 - 4 }}
                items={assignments}
                selectedValue={selectedIssue}
                onValueChange={(val: any) => setSelectedIsseu(val)}
              />
              <Box
                borderWidth={1}
                borderRadius={theme.radius.normal}
                borderColor={theme.colors.default}
                bg="info"
                pl={4}
                pr={4}
                mr={4}
                width={width / 2 - 16}
                justifyContent="center"
                aligItems="center"
              >
                <Text color="white">{dailyMissionStatusText(dailyMissionStatus)}</Text>
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
          dailyMissionStatus={dailyMissionStatus}
          checkList={checkListItem}
          dimentions={layoutHeight}
          data={masterData}
          loading={loading}
          navigation={navigation}
          isOnline={isOnline}
          setCheck={(items: any) => {
            setCheckListItem(items);
          }}
          getProducts={getProducts}
          isConnected={isConnected}
        />
      </Box>
    </Layout>
  );
};

export default HomeScreen;
