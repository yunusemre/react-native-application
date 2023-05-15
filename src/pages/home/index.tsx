import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, ScrollView } from 'react-native';
import { useIsConnected } from 'react-native-offline';
import { Button, ProgressBar, Searchbar, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Layout from '../../components/layout';
import Box from '../../components/ui/box';
import UiCard from '../../components/ui/card';
import UiEmpy from '../../components/ui/empty';
import UiMoreButton from '../../components/ui/more-button';
import UiPicker from '../../components/ui/select';
import { removeOfflineList } from '../../utils';
import { actions } from './actions';
import assignments from './assignment';

const HomeScreen = ({ navigation }: any) => {
  const isConnected = useIsConnected();
  const screenSize: any = Dimensions.get('screen');
  const [refresh, setRefresh] = useState(false);
  const [data, setData] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [selectedIssue, setSelectedIsseu] = useState();
  const [, setSelectedAction] = useState();
  const [showAction, setShowAction] = useState(false);

  // for dialog
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');

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
        <Box flexDirection="row" justifyContent="space-around" mb={2}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <UiPicker
              minWidth={160}
              items={assignments}
              selectedValue={selectedIssue}
              onValueChange={(val: any) => setSelectedIsseu(val)}
            />
            <UiMoreButton
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
            />

            <Button
              mode="outlined"
              style={{
                marginLeft: 10,
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
            <Box as={Text} color="danger" variant="labelMedium">
              Tamamlanamayan: 10
            </Box>
          </Box>
          <ProgressBar progress={Math.random()} />
        </Box>
        <Box height={screenSize.height - 200}>
          <FlatList
            refreshing={refresh}
            onRefresh={async () => {
              if (isConnected) {
                await isOnline();
                await getProducts();
              }
            }}
            data={data}
            renderItem={({ item, index }: any) => (
              <UiCard
                modalOutput={(val: string) => {
                  setShowModal(true);
                  setModalContent(val);
                }}
                index={index + 1}
                {...item}
              />
            )}
            keyExtractor={(item: any) => item.TaskId}
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
