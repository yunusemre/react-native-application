import theme from '@config/index';
import * as Linking from 'expo-linking';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Badge, Checkbox, IconButton, Menu, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Box from '../box';
import TaskStatusComponent from './status';

const UiCard = ({
  PartyDto,
  TaskId,
  TaskStatus, // iptal, tamamlandı, atandı
  TaskType,
  navigation,
  StopOrder,
  ShipmentList,
  TimePeriodId, // id ye göre ayırt ediliyordur geçikme kısmı
  IsSamedayDelivery, // aynı gün
  setCheck,
  itemCount = 0,
  customerTrackingId,
}: {
  PartyDto: PartyDtoModel;
  TaskStatus?: number;
  TaskType?: number;
  navigation: any;
  IsReturn?: number;
  StopOrder?: number;
  TaskId?: number;
  TimePeriodId?: number;
  ShipmentList?: any;
  IsSamedayDelivery: boolean;
  setCheck: any;
  itemCount: number;
  customerTrackingId: string;
}) => {
  const { Name, AddressText, Latitude, Longitude } = PartyDto;
  const [checked, setChecked] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <Box
      border={0.5}
      borderColor="borderColor"
      borderRadius={8}
      mb={8}
      pt={4}
      pb={4}
      bg={TaskStatusComponent({ status: TaskStatus, params: 'bg' })}
      color="white"
    >
      <Box flexDirection="row" minHeight={60}>
        <Box width={'15%'} alignItems="center">
          <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked);
              setCheck(TaskId);
            }}
          />
          <Box
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="center"
            width={70}
            pl={12}
            pr={12}
          >
            <Icon name="alarm" size={18} />
            {IsSamedayDelivery && <Icon name="hours-24" size={18} />}
            <Icon name="check-circle-outline" size={18} />
          </Box>
        </Box>
        <Box width={'85%'}>
          <Badge size={20} style={styles.orderBagde}>
            {StopOrder}
          </Badge>
          <Icon
            style={styles.taskType}
            name={TaskType === 1 ? 'archive-plus' : 'truck-delivery-outline'}
            size={20}
          />
          <Text style={[styles.w90, styles.fontBold]}>{Name}</Text>
          <Text style={styles.w90} variant="labelMedium">
            {AddressText}
          </Text>
          <Text variant="labelSmall">Müşteri Takip No: {customerTrackingId}</Text>
          <Text variant="labelSmall">Parça Sayısı: {itemCount}</Text>
          <Text variant="labelSmall" style={styles.fontBold}>
            {TaskStatusComponent({ status: TaskStatus, params: 'val' })}
          </Text>
          <Box style={styles.menuDropdown}>
            <Box
              as={Menu}
              visible={showMenu}
              onDismiss={() => setShowMenu(false)}
              anchor={
                <IconButton size={18} icon="dots-vertical" onPress={() => setShowMenu(!showMenu)} />
              }
            >
              <Menu.Item title="Görev Tamamla" />
              <Menu.Item title="Adres Bulunamadı" />
              <Menu.Item title="Görev İptal" />
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
    top: 4,
    right: 4,
    backgroundColor: 'transparent',
    color: theme.colors.color,
    borderWidth: 1,
    borderColor: theme.colors.color,
    fontWeight: 'bold',
    zIndex: 12,
  },
  taskType: {
    position: 'absolute',
    top: 26,
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

export default UiCard;
