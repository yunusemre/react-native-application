import Layout from '@components/layout';
import { Box, Text, UiPicker } from '@components/ui';
import theme from '@config/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setShipmentsData } from '@store/features/shipment-slice';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { TaskStatusEnum } from '@types/enums';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView } from 'react-native';
import { useIsConnected } from 'react-native-offline';
import { ProgressBar, Searchbar } from 'react-native-paper';
import assignments from './assignment';
import Issues from './issues';

const HomeScreen = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const { location, screenHeight } = useAppSelector((state) => state.apps);
  const { data } = useAppSelector((state) => state.shipments);
  const isConnected = useIsConnected();
  const { width }: { width: number } = Dimensions.get('screen');
  const [loading, setLoading] = useState(false);
  const [selectedIssue, setSelectedIsseu] = useState(1);
  const [search, setSearch] = useState('');
  const [masterData, setMasterData] = useState<any[]>([]);

  const [totalCount, setTotalCount] = useState<number>(0);
  const [completeCount, setCompleteCount] = useState<number>(0);
  const [percent, setPercent] = useState<number>(0);
  const [checkListItem, setCheckListItem] = useState<any>({});
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
    setTotalCount(0);
    axios(config)
      .then((response: any) => {
        const result = response?.Payload?.StopList;
        setDailyMissionStatus(response?.Payload?.DailyMissionStatus);
        setMasterData(result);
        dispatch(setShipmentsData(result));

        const total = result?.reduce((first: any, item: any) => first + item.TaskList?.length, 0);
        setTotalCount(total);
        //  Task Item Completed Count
        let totalCompletedCount = 0;
        result?.map((task: any) => {
          task.TaskList.find((taskItem: any) => {
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
        if (totalCompletedCount > 0) setCompleteCount(totalCompletedCount);
        if (totalCompletedCount > 0 && total > 0)
          setPercent(Math.ceil((totalCompletedCount / total) * 100));
      })
      .finally(() => setLoading(false));
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
    // const fetch = setInterval(() => getProducts(), 15 * 1000);
    // return () => clearInterval(fetch);
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

  const filterWithIssues = (issue: any) => {
    setSelectedIsseu(issue);
    const filtered = [...data];
    if (issue === 1) {
      setMasterData(data);
    }

    if (issue === 2) {
      const arr: any = [];
      filtered.forEach((item: any) => {
        const items: any = {};
        const taskItem: any[] = [];
        item.TaskList.find((task: any) => {
          if (task.TaskStatus === TaskStatusEnum.COMPLETED) {
            taskItem.push(task);
          }
        });
        items.TaskList = taskItem;
        arr.push(items);
      });
      setMasterData(arr);
    }

    if (issue === 3) {
      const arr: any = [];
      filtered.forEach((item: any) => {
        const items: any = {};
        const taskItem: any[] = [];
        item.TaskList.find((task: any) => {
          if (task.TaskType === 1) {
            taskItem.push(task);
          }
        });
        items.TaskList = taskItem;
        arr.push(items);
      });
      setMasterData(arr);
    }

    if (issue === 4) {
      const arr: any = [];
      filtered.forEach((item: any) => {
        const items: any = {};
        const taskItem: any[] = [];
        item.TaskList.find((task: any) => {
          if (task.TaskType === 2) {
            taskItem.push(task);
          }
        });
        items.TaskList = taskItem;
        arr.push(items);
      });
      setMasterData(arr);
    }

    if (issue === 5) {
      const arr: any = [];
      filtered.forEach((item: any) => {
        const items: any = {};
        const taskItem: any[] = [];
        item.TaskList.find((task: any) => {
          if (task.TaskType !== TaskStatusEnum.COMPLETED) {
            taskItem.push(task);
          }
        });
        items.TaskList = taskItem;
        arr.push(items);
      });
      setMasterData(arr);
    }
  };

  const layoutHeight = screenHeight - 78;
  return (
    <Layout
      isHeader
      isBottom
      backgroundColor={theme.colors.primary}
      openBarcode={() => navigation.navigate('barcode')}
    >
      <Box ml={8} mr={8} mt={4}>
        <Box height={70}>
          <Box flexDirection="row" height={40} mb={4}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <UiPicker
                style={{ width: width / 2 - 4 }}
                items={assignments}
                selectedValue={selectedIssue}
                onValueChange={(val: any) => filterWithIssues(val)}
              />
              <Searchbar
                style={{
                  width: width / 2 - 16,
                  borderRadius: theme.radius.normal,
                  borderWidth: 0,
                  borderColor: 'transparent',
                }}
                inputStyle={{ marginTop: -17, borderWidth: 0, borderColor: 'transparent' }}
                mode="view"
                placeholder="Search"
                onChangeText={(val) => searchList(val)}
                value={search}
              />
            </ScrollView>
          </Box>
          <Box height={30}>
            <Box flexDirection="row" justifyContent="space-between" mb={2}>
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
          setCheck={(items: any) => setCheckListItem(items)}
          getProducts={getProducts}
          isConnected={isConnected}
        />
      </Box>
    </Layout>
  );
};

export default HomeScreen;
