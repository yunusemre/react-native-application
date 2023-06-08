import theme from '@config/index';
import { globalStyle } from '@utils/global-style';
import * as Linking from 'expo-linking';
import React, { memo, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Badge, Checkbox, IconButton, Menu, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Box from '../../../components/ui/box';
import { TaskTypeEnum } from '../../../types/enums';
import { IUICard } from './model';
import { taskStatusByColor, taskStatusByText } from './status';

const UiCard = ({
  PartyDto,
  navigation,
  setCheck,
  TaskId,
  isCheck,
  itemCount = 0,
  customerTrackingId,
  ...items
}: IUICard) => {
  const { Name, AddressText, Latitude, Longitude, IsConfirmed } = PartyDto;
  const [checked, setChecked] = useState(isCheck);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <Box border={1} borderColor="borderColor" borderRadius={8} mb={4} pb={4}>
      <Box
        borderTopLeftRadius={8}
        borderTopRightRadius={8}
        p={6}
        bg={taskStatusByColor({
          IsPunctual: items.IsPunctual,
          status: items.TaskStatus,
        })}
      >
        <Box flexDirection="row" width={'100%'} justifyContent="space-between">
          <Box width={'92%'} flexDirection="row" justifyContent="space-between">
            <Box as={Text} justifyContent="flex-start" style={globalStyle.bold}>
              {taskStatusByText({ status: items.TaskStatus })}
            </Box>
            <Box flexDirection="row" justifyContent="flex-end" alignItems="center">
              <Box flexDirection="row" flexWrap="wrap">
                {items.ShipmentList.length !== 0 &&
                items.ShipmentList.some((ship: any) => ship.Neighbour !== null) ? (
                  <Icon name="alert-circle-outline" size={18} />
                ) : null}

                {TaskTypeEnum.PICKUP === items.TaskType &&
                items.TimePeriodModel !== null &&
                items.TimePeriodModel.TimePeriodId > 0 ? (
                  <Icon name="bell-off" size={18} />
                ) : null}

                {!items.IsRingTheBellPermitted ? null : <Icon name="alarm" size={18} />}

                {TaskTypeEnum.PICKUP === items.TaskType &&
                items.ShipmentList.some((ship: any) => ship.IsReturn) ? (
                  <Icon name="basket" size={18} />
                ) : null}

                {items.IsPartyAtTheAddress ? <Icon name="home" size={18} /> : null}

                {items.ShipmentList.some((ship: any) => ship.OnlyDeliverToRecipient) ? (
                  <Icon name="face-man" size={18} />
                ) : null}

                {items.ShipmentList.some((ship: any) => ship.IsCollectionRequired) ? (
                  <Icon name="cash" size={18} />
                ) : null}

                {items.ShipmentList.some((ship: any) => ship.IsDeliveryInsideTimeWindow) ? (
                  <Icon name="truck-fast-outline" size={18} />
                ) : null}

                {items.ShipmentList.some((ship: any) => ship.IsSamedayDelivery) ? (
                  <Icon name="hours-24" size={18} />
                ) : null}

                {IsConfirmed ? <Icon name="check-circle-outline" size={18} /> : null}
              </Box>
              <Box
                bg="rgba(255, 255, 255, 0.3)"
                p={2}
                borderRadius={4}
                ml={6}
                as={Text}
                variant="bodySmall"
              >
                {items.TaskType === 1 ? 'Toplama' : 'Yükleme'}
              </Box>
            </Box>
          </Box>
          <Box width={'8%'} flexDirection="row" justifyContent="space-between">
            <Box style={styles.menuDropdown}>
              <Box
                as={Menu}
                visible={showMenu}
                onDismiss={() => setShowMenu(false)}
                anchor={
                  <IconButton
                    size={18}
                    icon="dots-horizontal"
                    onPress={() => setShowMenu(!showMenu)}
                  />
                }
              >
                <Menu.Item title="Zimmete Devam Et" />
                <Menu.Item title="Görevi Tamamla" />
                <Menu.Item title="Adreste Bulunamadı" />
                <Menu.Item title="Görev İptal" />
                <Menu.Item title="Teslim Edilemedi" />
                <Menu.Item title="Randevu Gir" />
                <Menu.Item title="Adres Problemli" />
                <Menu.Item title="Müşteriyi Arama" />
                <Menu.Item
                  title="Adrese Git"
                  onPress={() =>
                    navigation.navigate('mapping', {
                      Latitude,
                      Longitude,
                    })
                  }
                />
                <Menu.Item
                  title="Navigasyonu Aç"
                  onPress={() =>
                    Linking.openURL(`http://maps.google.com/maps?daddr=${Latitude}, ${Longitude}`)
                  }
                />
                <Menu.Item title="İş Yeri Kapalı" />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box flexDirection="row" minHeight={60}>
        <Box width={'10%'}>
          <Checkbox
            status={isCheck ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked);
              setCheck({ [TaskId]: !checked });
            }}
          />
        </Box>
        <Box width={'90%'}>
          <Badge size={20} style={[styles.orderBagde, globalStyle.bold]}>
            {items.StopOrder}
          </Badge>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.w90]}
            onPress={() => navigation.navigate('home-detail', { ...items.ShipmentList, TaskId })}
          >
            <Text style={[styles.w90]}>{Name}</Text>
            <Text style={styles.w90} variant="labelMedium">
              {AddressText}
            </Text>
            <Text variant="labelSmall">Müşteri Takip No: {customerTrackingId}</Text>
            <Text variant="labelSmall">Parça Sayısı: {itemCount}</Text>
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
  menuDropdown: { position: 'absolute', bottom: -12, right: -14 },
  w90: { width: '95%' },
});

export default memo(UiCard);
