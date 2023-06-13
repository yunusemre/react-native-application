import { Box } from '@components/ui';
import { TaskStatusEnum, TaskTypeEnum } from '@types/enums';
import { memo, useState } from 'react';
import { Linking, StyleSheet } from 'react-native';
import { IconButton, Menu } from 'react-native-paper';

const CardMenu = ({
  TaskStatus,
  TaskType,
  isAllShipmentItemReadyForDelivery2,
  navigation,
  Latitude,
  Longitude,
}: any) => {
  const today = new Date();
  const options: any = { weekday: 'long' };
  const isSaturday = new Intl.DateTimeFormat('tr-TR', options).format(today) === 'Cumartesi';

  const [showMenu, setShowMenu] = useState(false);
  return (
    <Box style={styles.menuDropdown}>
      <Box
        as={Menu}
        visible={showMenu}
        onDismiss={() => setShowMenu(false)}
        anchor={
          <IconButton
            style={{ backgroundColor: 'transparent' }}
            size={18}
            icon="dots-horizontal"
            onPress={() => setShowMenu(!showMenu)}
          />
        }
      >
        <Menu.Item testID="menu1" title="Zimmete Devam Et" />
        {TaskStatus !== TaskStatusEnum.COMPLETED ? (
          <Menu.Item testID="menu2" title="Görevi Tamamla" />
        ) : null}
        {!isAllShipmentItemReadyForDelivery2 || TaskStatus !== TaskStatusEnum.COMPLETED ? (
          <Menu.Item testID="menu3" title="Adreste Bulunamadı" />
        ) : null}
        {TaskStatus !== TaskStatusEnum.COMPLETED && TaskType === TaskTypeEnum.PICKUP && (
          <Menu.Item testID="menu4" title="Görev İptal" />
        )}
        {!isAllShipmentItemReadyForDelivery2 ||
          (TaskStatus !== TaskStatusEnum.COMPLETED && TaskType !== TaskTypeEnum.PICKUP && (
            <Menu.Item testID="menu5" title="Teslim Edilemedi" />
          ))}
        {!isAllShipmentItemReadyForDelivery2 ||
          (((TaskStatus !== TaskStatusEnum.COMPLETED && TaskType !== TaskTypeEnum.PICKUP) ||
            (TaskStatus !== TaskStatusEnum.COMPLETED && TaskType === TaskTypeEnum.PICKUP)) && (
            <Menu.Item testID="menu6" title="Randevu Gir" />
          ))}
        <Menu.Item testID="menu7" title="Adres Problemli" />
        {!isAllShipmentItemReadyForDelivery2 ||
          (TaskStatus == TaskStatusEnum.ASSIGNED && (
            <Menu.Item testID="menu8" title="Müşteriyi Arama" />
          ))}
        {/* NEXT_TASK_ID konusuna bakacam */}
        <Menu.Item
          testID="menu9"
          title="Adrese Git"
          onPress={() =>
            navigation.navigate('mapping', {
              Latitude,
              Longitude,
            })
          }
        />
        <Menu.Item
          testID="menu11"
          title="Navigasyonu Aç"
          onPress={() =>
            Linking.openURL(`http://maps.google.com/maps?daddr=${Latitude}, ${Longitude}`)
          }
        />
        {/* NEXT_TASK_ID son */}
        {TaskStatus !== TaskStatusEnum.CANCELLED &&
        TaskStatus !== TaskStatusEnum.COMPLETED &&
        isSaturday ? (
          <Menu.Item testID="menu12" title="İş Yeri Kapalı" />
        ) : null}
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  menuDropdown: { position: 'absolute', bottom: -13, right: -12 },
});

export default memo(CardMenu);
