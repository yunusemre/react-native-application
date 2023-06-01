import theme from '@config/index';
import * as Linking from 'expo-linking';
import React, { memo, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Badge, Checkbox, IconButton, Menu, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Box from '../../../components/ui/box';
import { TaskTypeEnum } from '../../../types/enums';
import { IUICard } from './model';
import { TaskStatusComponent } from './status';

const UiCard = ({
  PartyDto,
  navigation,
  setCheck,
  itemCount = 0,
  IsPunctual,
  customerTrackingId,
  ...items
}: IUICard) => {
  const { Name, AddressText, Latitude, Longitude, IsConfirmed } = PartyDto;
  const [checked, setChecked] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <Box
      border={1}
      borderColor="borderColor"
      borderRadius={8}
      mb={8}
      pt={4}
      pb={4}
      bg="red"
      color="white"
    >
      <Box flexDirection="row" minHeight={60}>
        <Box width={'15%'}>
          <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked);
              setCheck(items.TaskId);
            }}
          />
          <Box flexDirection="row" flexWrap="wrap" width={70} pl={10} pr={12}>
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
        </Box>
        <Box width={'85%'}>
          <Badge size={20} style={styles.orderBagde}>
            {items.StopOrder}
          </Badge>
          <Icon
            style={styles.taskType}
            name={items.TaskType === 1 ? 'archive-plus' : 'truck-delivery-outline'}
            size={22}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.w90]}
            onPress={() => navigation.navigate('detail', items.ShipmentList)}
          >
            <Text style={[styles.w90, styles.fontBold]}>{Name}</Text>
            <Text style={styles.w90} variant="labelMedium">
              {AddressText}
            </Text>
            <Text variant="labelSmall">Müşteri Takip No: {customerTrackingId}</Text>
            <Text variant="labelSmall">Parça Sayısı: {itemCount}</Text>
            <Text variant="labelSmall" style={styles.fontBold}>
              {TaskStatusComponent({ status: items.TaskStatus, params: 'val' })}
            </Text>
          </TouchableOpacity>
          <Box style={styles.menuDropdown}>
            <Box
              as={Menu}
              visible={showMenu}
              onDismiss={() => setShowMenu(false)}
              anchor={
                <IconButton size={18} icon="dots-vertical" onPress={() => setShowMenu(!showMenu)} />
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
  );
};

const styles = StyleSheet.create({
  orderBagde: {
    position: 'absolute',
    top: 2,
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
  menuDropdown: { position: 'absolute', bottom: -10, right: -7 },
  w90: { width: '90%' },
  fontBold: { fontWeight: 'bold' },
});

export default memo(UiCard);
