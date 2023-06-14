import { Box, Text, UiEmpy } from '@components/ui';
import theme from '@config/index';
import { dailyMissionStatusText } from '@utils/daily-mission-status';
import { globalStyle } from '@utils/global-style';
import { memo, useEffect, useState } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { Checkbox } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import UiCard from './card';

const Issues = ({
  dimentions,
  data,
  loading,
  navigation,
  isOnline,
  getProducts,
  isConnected,
  checkList,
  setCheck,
  dailyMissionStatus,
}: any) => {
  const allItemCheckList = { ...checkList };
  const [checked, setChecked] = useState(false);

  const checkAllItems = (val: boolean) => {
    for (const [key] of Object.entries(allItemCheckList)) allItemCheckList[key] = !val;
    setCheck(allItemCheckList);
    setChecked(!val);
  };

  useEffect(() => {
    setChecked(false);
  }, [data]);

  return (
    <Box>
      <Box
        border={1}
        borderColor="borderColor"
        borderRadius={8}
        mb={8}
        mt={4}
        pt={4}
        pb={4}
        color="white"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        height={30}
        bg="white"
      >
        <Box flexDirection="row" alignItems="center">
          <Checkbox.Android
            disabled={data?.length === 0}
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              checkAllItems(checked);
            }}
          />
          <Text
            onPress={() => checkAllItems(checked)}
            color={data?.length === 0 ? 'gray' : 'color'}
          >
            Tümünü Seç
          </Text>
        </Box>
        <Box style={globalStyle.bold} as={Text} variant="labelSmall" mr={6}>
          {dailyMissionStatusText(dailyMissionStatus)}
        </Box>
      </Box>
      <Box height={dimentions - 62}>
        <ScrollView
          refreshControl={
            <RefreshControl
              progressBackgroundColor={theme.colors.primary}
              colors={['white']}
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
          {loading === false && data?.length === 0 && (
            <UiEmpy
              bg="info"
              mt={8}
              mb={8}
              p={8}
              text={
                <Box flexDirection="row" alignItems="center">
                  <Icon name="alert-circle-outline" size={20} />
                  <Box as={Text} ml={10} flexDirection="row" alignItems="center">
                    Gösterilecek bir veri bulunamadı.
                  </Box>
                </Box>
              }
            />
          )}
          {data?.map((response: any) => {
            return response.TaskList?.map((item: any, index: number) => {
              const sumShipmentItemListCount = item.ShipmentList.reduce(
                (accumulator: any, currentValue: any) =>
                  accumulator + currentValue.ShipmentItemList?.length,
                0
              );

              const customerTrackingId =
                item.ShipmentList.length > 0 &&
                item.ShipmentList[0].ShipmentItemList[0].CustomerTrackingId;
              return (
                <UiCard
                  courierUserId={response.CourierUserId}
                  dailyMissionStatus={dailyMissionStatus}
                  isCheck={checkList[item.TaskId]}
                  customerTrackingId={customerTrackingId}
                  itemCount={sumShipmentItemListCount}
                  setCheck={(res: any) => setCheck({ ...checkList, ...res })}
                  key={index}
                  navigation={navigation}
                  {...item}
                />
              );
            });
          })}
        </ScrollView>
      </Box>
    </Box>
  );
};

export default memo(Issues);