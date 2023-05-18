import Layout from '@components/layout';
import Box from '@components/ui/box';
import UiCard from '@components/ui/card';
import UiEmpy from '@components/ui/empty';
import UiPicker from '@components/ui/select';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setShipmentsData } from '@store/features/shipment-slice';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { removeOfflineList } from '@utils/index';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, ScrollView } from 'react-native';
import { useIsConnected } from 'react-native-offline';
import { Button, ProgressBar, Searchbar, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { actions } from './actions';
import assignments from './assignment';

const HomeScreen = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const { location, isLogin } = useAppSelector((state) => state.apps);
  const { data, loading } = useAppSelector((state) => state.shipments);
  const isConnected = useIsConnected();
  const screenSize: any = Dimensions.get('screen');
  const [showSearch, setShowSearch] = useState(false);
  const [selectedIssue, setSelectedIsseu] = useState();
  const [selectedAction, setSelectedAction] = useState();
  const [search, setSearch] = useState('');

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
      const Lists: any = response.Payload.StopList;
      const newList: any = [];
      Lists.forEach((res: any) => {
        if (res.TaskList.length === 1) {
          newList.push(res.TaskList[0]);
        } else {
          res.TaskList.forEach((response: any) => {
            newList.push(response);
          });
        }
      });
      dispatch(setShipmentsData(newList));
    });
  };

  const isOnline = async () => {
    const offline: any = (await AsyncStorage.getItem('@offline')) || '[]';
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

  return (
    <Layout isHeader openBarcode={() => navigation.navigate('barcode')}>
      <Box ml={8} mr={8} mt={4}>
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
            {/* <UiMoreButton
              style={{ marginLeft: 5 }}
              selected={(val: any) => {
                setSelectedAction(val);
                setShowAction(false);
              }}
              title="İşlemler"
              data={actions}
              icon="menu-down"
              openMenu={() => setShowAction(true)}
              show={showAction}
              closeMenu={() => setShowAction(false)}
            /> */}

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
        <Box mt={4}>
          <Box flexDirection="row" justifyContent="space-between" mb={8}>
            <Box as={Text} color="green" variant="labelMedium">
              Tamamlanan: 10
            </Box>
            <Box as={Text} color="danger" variant="labelMedium">
              Tamamlanamayan: 6
            </Box>
          </Box>
          <ProgressBar progress={Math.random()} />
        </Box>
        <Box height={screenSize.height - 220}>
          <FlatList
            refreshing={loading}
            onRefresh={async () => {
              if (isConnected) {
                await isOnline();
                await getProducts();
              }
            }}
            data={data}
            renderItem={({ item, index }: any) => (
              <UiCard index={index + 1} navigation={navigation} {...item} />
            )}
            keyExtractor={(item: any, index: number) => item.TaskId}
            ListEmptyComponent={
              <UiEmpy
                bg="primary"
                textType="white"
                mt={8}
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
