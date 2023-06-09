import { Box, Text, UiEmpy } from '@components/ui';
import { DailyMissionStatus, TaskStatusEnum, TaskTypeEnum } from '@types/enums';
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
  const [isAllShipmentItemReadyForDelivery, setIsAllShipmentItemReadyForDelivery] = useState(false);

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
        alignItems="center"
        height={30}
        bg="white"
      >
        <Checkbox
          status={checked ? 'checked' : 'unchecked'}
          onPress={() => {
            checkAllItems(checked);
          }}
        />
        <Text>Tümünü Seç</Text>
      </Box>
      <Box height={dimentions - 62}>
        {loading === false && data?.length === 0 && (
          <UiEmpy
            bg="info"
            mt={8}
            mb={8}
            p={8}
            text={
              <Box flexDirection="row">
                <Icon name="alert-circle-outline" size={20} />
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
            return response.TaskList?.map((item: any, index: number) => {
              const taskType = item.TaskType;
              if (
                TaskTypeEnum.DELIVERY === taskType &&
                taskType !== TaskStatusEnum.COMPLETED &&
                (DailyMissionStatus.START_OF_DAY === dailyMissionStatus ||
                  DailyMissionStatus.WAITING_FOR_EXIT_REQUEST_APPROVAL === dailyMissionStatus)
              ) {
                console.log('blabla');
              }
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

// if (taskTypeEnumInstance == Extensions.TaskType.DELIVERY && taskStatusEnumInstance != Extensions.TaskStatus.COMPLETED &&
//   (dailyMissionStatusEnumInstance == Extensions.DailyMissionStatus.START_OF_DAY ||
//   dailyMissionStatusEnumInstance == Extensions.DailyMissionStatus.WAITING_FOR_EXIT_REQUEST_APPROVAL)) {
// outerloop:
// for (Shipment shipmentModel : mItem.getShipmentList()) {

//   for (ShipmentItem shipmentItemModel : shipmentModel.getShipmentItemList()) {
//       Extensions.ShipmentItemStatus shipmentItemStatusEnumInstance = Extensions.ShipmentItemStatus.enumOf(shipmentItemModel.getShipmentItemStatusId());
//       Extensions.ShipmentLocationStatus shipmentLocationStatusEnumInstance = Extensions.ShipmentLocationStatus.enumOf(shipmentItemModel.getShipmentLocationId());
//       if (shipmentItemStatusEnumInstance == Extensions.ShipmentItemStatus.LOADED
//               && shipmentLocationStatusEnumInstance == Extensions.ShipmentLocationStatus.ON_DELIVERY_COURIER
//               && shipmentItemModel.getCurrentWithholderUserId() == Constants.getSPreferences(context).getUSER_ID()) {
//           isAllShipmentItemReadyForDelivery = true;
//       } else {
//           isAllShipmentItemReadyForDelivery = false;
//           break outerloop;
//       }

//   }

// }

// }
