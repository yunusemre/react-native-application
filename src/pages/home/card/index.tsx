import Box from '@components/ui/box';
import theme from '@config/index';
import { useAppSelector } from '@store/hooks';
import { TaskCompletionReasonEnum, TaskStatusEnum } from '@types/enums';
import { TRANSLATE } from '@translate/content';
import { globalStyle } from '@utils/global-style';
import React, { memo, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Badge, Checkbox, Text } from 'react-native-paper';
import CardMenu from './card-menu';
import {
  checkAllShipmentItemReadyForDelivery,
  checkAllShipmentItemReadyForDelivery2,
  taskStatusByColor,
} from './control-functions';
import { IconStatus } from './icon-status';
import { IUICard } from './model';

const UiCard = ({
  isDetailPage = false,
  showDetail = false,
  PartyDto,
  navigation,
  setCheck,
  TaskId,
  TaskType,
  isCheck,
  itemCount = 0,
  customerTrackingId,
  dailyMissionStatus,
  ShipmentList,
  TaskCompletionReason,
  IsRingTheBellPermitted,
  TaskStatus,
  ...items
}: IUICard) => {
  const { userInfo } = useAppSelector((state) => state.apps);
  const { Name, AddressText, Latitude, Longitude, IsConfirmed } = PartyDto;
  const [checked, setChecked] = useState(isCheck);

  const isAllShipmentItemReadyForDelivery = checkAllShipmentItemReadyForDelivery({
    TaskStatus: TaskStatus,
    TaskType: TaskType,
    dailyMissionStatus: dailyMissionStatus,
    ShipmentList: ShipmentList,
    userID: userInfo?.UserId,
  });
  console.log('TaskCompletionReason', TaskCompletionReason);
  const isAllShipmentItemReadyForDelivery2 = checkAllShipmentItemReadyForDelivery2({
    TaskStatus: TaskStatus,
    TaskType: TaskType,
    dailyMissionStatus: dailyMissionStatus,
    ShipmentList: ShipmentList,
    userID: userInfo?.UserId,
  });

  return (
    <Box
      border={1}
      borderColor={taskStatusByColor({
        IsPunctual: items.IsPunctual,
        status: TaskStatus,
        isAllShipmentItemReadyForDelivery: isAllShipmentItemReadyForDelivery,
      })}
      borderRadius={8}
      mb={8}
      pb={4}
      style={{ overflow: 'hidden' }}
    >
      <Box
        pt={6}
        pb={6}
        pr={8}
        pl={8}
        bg={taskStatusByColor({
          IsPunctual: items.IsPunctual,
          status: TaskStatus,
          isAllShipmentItemReadyForDelivery: isAllShipmentItemReadyForDelivery,
        })}
      >
        <Box flexDirection="row" width={'100%'} justifyContent="space-between">
          <Box width={'92%'} flexDirection="row" justifyContent="space-between" alignItems="center">
            <Box
              as={Text}
              variant="labelSmall"
              justifyContent="flex-start"
              style={globalStyle.bold}
            >
              {TRANSLATE[TaskStatusEnum[TaskStatus]]}
            </Box>
            <Box flexDirection="row" justifyContent="flex-end" alignItems="center">
              <IconStatus
                TaskType={TaskType}
                ShipmentList={ShipmentList}
                IsRingTheBellPermitted={IsRingTheBellPermitted}
                TimePeriodModel={items.TimePeriodModel}
                IsPartyAtTheAddress={items.IsPartyAtTheAddress}
                IsConfirmed={IsConfirmed}
              />
              <Box
                bg="rgba(255, 255, 255, 0.3)"
                p={2}
                borderRadius={4}
                ml={6}
                height={20}
                as={Text}
                variant="labelSmall"
              >
                {TaskType === 1 ? 'Toplama' : 'Teslimat'}
              </Box>
            </Box>
          </Box>
          <Box width={'8%'} flexDirection="row" justifyContent="space-between">
            {TaskStatusEnum.CANCELLED === TaskStatus ? null : (
              <CardMenu
                TaskId={TaskId}
                dailyMissionStatus={dailyMissionStatus}
                isDetailPage={isDetailPage}
                TaskStatus={TaskStatus}
                TaskType={TaskType}
                isAllShipmentItemReadyForDelivery={isAllShipmentItemReadyForDelivery}
                isAllShipmentItemReadyForDelivery2={isAllShipmentItemReadyForDelivery2}
                navigation={navigation}
                Latitude={Latitude}
                Longitude={Longitude}
              />
            )}
          </Box>
        </Box>
      </Box>
      <Box flexDirection="row" minHeight={60}>
        {!showDetail && (
          <Box width={'10%'}>
            <Checkbox.Android
              status={isCheck ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked(!checked);
                setCheck({ [TaskId]: !checked });
              }}
            />
          </Box>
        )}
        <Box width={showDetail ? '100%' : '90%'} pl={showDetail ? 8 : 0}>
          <Badge size={20} style={[styles.orderBagde, globalStyle.bold]}>
            {items.StopOrder}
          </Badge>
          <TouchableOpacity
            activeOpacity={0.6}
            style={[styles.w90]}
            onPress={() =>
              !showDetail ? navigation.navigate('home-detail', { ...ShipmentList, TaskId }) : null
            }
          >
            {Name ? <Text style={[globalStyle.bold, styles.w90]}>{Name}</Text> : null}
            {AddressText ? (
              <Text style={styles.w90} variant="labelMedium">
                {AddressText}
              </Text>
            ) : null}
            {customerTrackingId ? (
              <Text variant="labelSmall">Müşteri Takip No: {customerTrackingId}</Text>
            ) : null}
            {showDetail && (
              <Text variant="labelMedium" style={globalStyle.bold}>
                Task ID: {TaskId}
              </Text>
            )}
            {itemCount ? <Text variant="labelSmall">Parça Sayısı: {itemCount}</Text> : null}
            {!showDetail && TaskStatusEnum.CANCELLED === TaskStatus && (
              <Text variant="labelSmall" style={[globalStyle.bold, globalStyle.italic]}>
                İptal nedeni: {TRANSLATE[TaskCompletionReasonEnum[TaskCompletionReason]]}
              </Text>
            )}
          </TouchableOpacity>
        </Box>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  orderBagde: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: 'transparent',
    color: theme.colors.color,
    borderWidth: 1,
    borderColor: theme.colors.color,
    fontWeight: 'bold',
    zIndex: 12,
  },
  taskType: {
    position: 'absolute',
    top: 24,
    right: 4,
    backgroundColor: 'transparent',
    color: theme.colors.color,
    fontWeight: 'bold',
    zIndex: 12,
  },
  w90: { width: '95%' },
});

export default memo(UiCard);
