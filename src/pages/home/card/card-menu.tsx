import { Box } from '@components/ui';
import { TaskStatusEnum, TaskTypeEnum } from '@types/enums';
import { useState } from 'react';
import { Linking, StyleSheet } from 'react-native';
import { IconButton, Menu } from 'react-native-paper';

const CardMenu = ({
  isDetailPage = false,
  dailyMissionStatus,
  TaskStatus,
  TaskType,
  isAllShipmentItemReadyForDelivery,
  isAllShipmentItemReadyForDelivery2,
  navigation,
  Latitude,
  Longitude,
  TaskId,
}: any) => {
  const today = new Date();
  const options: any = { weekday: 'long' };
  const isSaturday = new Intl.DateTimeFormat('tr-TR', options).format(today) === 'Cumartesi';
  const [showMenu, setShowMenu] = useState(false);
  const menuStatus = {
    menu2: false,
    menu3: false,
    menu4: false,
    menu5: false,
    menu6: false,
    menu7: true,
    menu8: false,
    menu9: true,
    menu10: false,
    menu11: true,
    menu12: true,
  };

  const controlMenuPermissionForItemDetail = () => {
    menuStatus.menu9 = false;
    menuStatus.menu11 = false;
    menuStatus.menu12 = false;

    if (
      isSaturday &&
      TaskStatus != TaskStatusEnum.CANCELLED &&
      TaskStatus != TaskStatusEnum.COMPLETED
    ) {
      menuStatus.menu12 = true;
    }

    if (TaskStatus == TaskStatusEnum.ASSIGNED) {
      menuStatus.menu8 = true;
    }

    if (TaskStatus != TaskStatusEnum.COMPLETED) {
      menuStatus.menu2 = true;
      menuStatus.menu3 = true;
    }

    if (TaskType == TaskTypeEnum.PICKUP) {
      menuStatus.menu3 = false;
    }

    if (TaskStatus != TaskStatusEnum.COMPLETED && TaskType != TaskTypeEnum.PICKUP) {
      menuStatus.menu5 = true;
      menuStatus.menu6 = true;
    }

    if (TaskType == TaskTypeEnum.DELIVERY) {
      menuStatus.menu2 = false;
    }

    if (!isAllShipmentItemReadyForDelivery && TaskType == TaskTypeEnum.DELIVERY) {
      menuStatus.menu3 = false;
      menuStatus.menu5 = false;
      menuStatus.menu6 = false;
      menuStatus.menu8 = false;
    }
  };

  const controlMenuPermissionForItem = () => {
    menuStatus.menu9 = false;
    menuStatus.menu11 = false;
    menuStatus.menu12 = false;

    if (
      isSaturday &&
      TaskStatus != TaskStatusEnum.CANCELLED &&
      TaskStatus != TaskStatusEnum.COMPLETED
    ) {
      menuStatus.menu12 = true;
    }

    if (TaskStatus == TaskStatusEnum.ASSIGNED) {
      menuStatus.menu8 = true;
    }

    if (TaskStatus != TaskStatusEnum.COMPLETED) {
      menuStatus.menu2 = true;
      menuStatus.menu3 = true;
    }

    if (TaskStatus != TaskStatusEnum.COMPLETED && TaskType == TaskTypeEnum.PICKUP) {
      menuStatus.menu4 = true;
    }

    if (TaskStatus != TaskStatusEnum.COMPLETED && TaskType != TaskTypeEnum.PICKUP) {
      menuStatus.menu5 = true;
      menuStatus.menu6 = true;
    }

    if (TaskStatus != TaskStatusEnum.COMPLETED && TaskType == TaskTypeEnum.PICKUP) {
      menuStatus.menu6 = true;
    }

    if (TaskType == TaskTypeEnum.PICKUP && TaskStatus != TaskStatusEnum.COMPLETED) {
      menuStatus.menu11 = true;
    }

    if (TaskType == TaskTypeEnum.DELIVERY) {
      menuStatus.menu2 = false;
    }

    if (!isAllShipmentItemReadyForDelivery2 && TaskType == TaskTypeEnum.DELIVERY) {
      menuStatus.menu3 = false;
      menuStatus.menu5 = false;
      menuStatus.menu6 = false;
      menuStatus.menu8 = false;
    }
  };

  if (isDetailPage) {
    controlMenuPermissionForItemDetail();
  } else {
    controlMenuPermissionForItem();
  }

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
        {menuStatus.menu2 ? <Menu.Item testID="menu2" title="Görevi Tamamla" /> : null}
        {menuStatus.menu3 ? <Menu.Item testID="menu3" title="Adreste Bulunamadı" /> : null}
        {menuStatus.menu4 ? <Menu.Item testID="menu4" title="Görev İptal" /> : null}
        {menuStatus.menu5 ? <Menu.Item testID="menu5" title="Teslim Edilemedi" /> : null}
        {menuStatus.menu6 ? <Menu.Item testID="menu6" title="Randevu Gir" /> : null}
        {menuStatus.menu7 ? <Menu.Item testID="menu7" title="Müşteriyi Arama" /> : null}
        {menuStatus.menu8 ? <Menu.Item testID="menu8" title="Adres Problemli" /> : null}
        {menuStatus.menu9 ? <Menu.Item testID="menu9" title="Adrese Git" /> : null}
        {menuStatus.menu11 ? (
          <Menu.Item
            testID="menu11"
            title="Navigasyonu Aç"
            onPress={() =>
              Linking.openURL(`http://maps.google.com/maps?daddr=${Latitude}, ${Longitude}`)
            }
          />
        ) : null}
        {menuStatus.menu12 ? <Menu.Item testID="menu12" title="İş Yeri Kapalı" /> : null}
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  menuDropdown: { position: 'absolute', bottom: -13, right: -12 },
});

export default CardMenu;
