import { Box, UiEmpy, UiPicker } from '@components/ui';
import theme from '@config/index';
import DateTimePicker from '@react-native-community/datetimepicker';
import { memo, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Checkbox, Dialog, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { issueCancelList } from './isssues';

const ShipmentItems = ({ data, navigation, dimentions, taskId }: any) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedIssue, setSelectedIsseu] = useState();

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  return (
    <Box mb={8} pb={4}>
      {data.ShipmentItemList?.length === 0 ? (
        <UiEmpy
          bg="info"
          mt={8}
          mb={8}
          p={8}
          text={
            <Box flexDirection="row">
              <Icon name="alert-circle-outline" size={20} color="white" />
              <Box color="white" as={Text} ml={10}>
                Gösterilecek bir data yok.
              </Box>
            </Box>
          }
        />
      ) : null}
      <Box height={dimentions - 70}>
        <ScrollView>
          {data.map((result: any) => {
            return result?.ShipmentItemList?.map((item: any, indexS: number) => {
              return (
                <Box
                  border={1}
                  borderColor="borderColor"
                  borderRadius={8}
                  color="white"
                  bg="white"
                  key={item.ShipmentId}
                  pt={8}
                  pb={8}
                  pr={8}
                  mb={8}
                  flexDirection="row"
                >
                  <Box width={'10%'}>
                    <Checkbox.Android status="checked" onPress={() => {}} />
                  </Box>
                  <Box width={'90%'}>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() =>
                        navigation.navigate('home-detail-weight', {
                          taskId: taskId,
                          shipmentItemId: item.hipmentItemId,
                        })
                      }
                    >
                      <Box flexDirection="row" justifyContent="space-between">
                        <Text variant="bodySmall" style={styles.detailHr}>
                          Gönderi Takip No:
                        </Text>
                        <Text variant="bodySmall" style={styles.detailHr}>
                          {result.ShipmentId}
                        </Text>
                      </Box>
                      <Box flexDirection="row" justifyContent="space-between">
                        <Text variant="bodySmall" style={styles.detailHr}>
                          Müşteri Takip No:
                        </Text>
                        <Text variant="bodySmall" style={styles.detailHr}>
                          {result.CustomerTrackingId}
                        </Text>
                      </Box>
                      <Box flexDirection="row" justifyContent="space-between">
                        <Text variant="bodySmall" style={styles.detailHr}>
                          İade Gönderi:
                        </Text>
                        <Text variant="bodySmall" style={styles.detailHr}>
                          {result.ReturnType === 0 ? 'Hayır' : 'Evet'}
                        </Text>
                      </Box>
                      <Box flexDirection="row" justifyContent="space-between">
                        <Text variant="bodySmall" style={styles.detailHr}>
                          Onaylı Adres:
                        </Text>
                        <Text variant="bodySmall" style={styles.detailHr}>
                          -
                        </Text>
                      </Box>
                      <Box flexDirection="row" justifyContent="space-between">
                        <Text variant="bodySmall" style={styles.detailHr}>
                          Gönderi Tipi:
                        </Text>
                        <Text variant="bodySmall" style={styles.detailHr}>
                          {result.ShipmentItemList.length}
                        </Text>
                      </Box>
                      <Box flexDirection="row" justifyContent="space-between">
                        <Text variant="bodySmall" style={styles.detailHr}>
                          Parça Sayısı:
                        </Text>
                        <Text variant="bodySmall" style={styles.detailHr}>
                          {result.ShipmentItemList.length}
                        </Text>
                      </Box>
                      <Box flexDirection="row" justifyContent="space-between">
                        <Text variant="bodySmall" style={styles.detailHr}>
                          Toplam Desi:
                        </Text>
                        <Text variant="bodySmall" style={styles.detailHr}>
                          {item.Deci}
                        </Text>
                      </Box>
                      <Box flexDirection="row" justifyContent="space-between">
                        <Text variant="bodySmall" style={styles.detailHr}>
                          Toplam Ağırlık:
                        </Text>
                        <Text variant="bodySmall" style={styles.detailHr}>
                          {item.Weight}
                        </Text>
                      </Box>
                      <Box flexDirection="row" justifyContent="space-between">
                        <Text variant="bodySmall" style={styles.detailHr}>
                          Gel Al Paket:
                        </Text>
                        <Text variant="bodySmall" style={styles.detailHr}>
                          -
                        </Text>
                      </Box>
                    </TouchableOpacity>
                  </Box>
                </Box>
              );
            });
          })}
        </ScrollView>
      </Box>
      <Box height={40} mt={8} flexDirection="row" justifyContent="space-between">
        <Button onPress={() => setShow(true)} style={{ width: '49%' }} mode="contained">
          Toplam Randevu Gir
        </Button>
        <Button style={{ width: '50%' }} mode="contained" onPress={() => setVisible(true)}>
          Gönderi İptal
        </Button>
      </Box>
      {show && (
        <DateTimePicker
          locale="tr-TR"
          positiveButton={{ label: 'Randevu Gir', textColor: theme.colors.primary }}
          negativeButton={{ label: 'İptal', textColor: theme.colors.gray }}
          testID="dateTimePicker"
          value={date}
          mode="date"
          onChange={onChange}
        />
      )}
      <Dialog
        visible={visible}
        onDismiss={() => setVisible(false)}
        style={{ borderRadius: theme.radius.normal }}
      >
        <Box m={8}>
          <Box mb={6}>
            <Text>Gönderi iptal için alt neden seçiniz</Text>
          </Box>
          <UiPicker
            style={{ width: 330 }}
            items={issueCancelList}
            selectedValue={selectedIssue}
            onValueChange={(val: any) => setSelectedIsseu(val)}
          />
        </Box>
        <Dialog.Actions>
          <Button onPress={() => setVisible(false)}>Vazgeç</Button>
          <Button mode="contained" onPress={() => setVisible(false)}>
            Gönder
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Box>
  );
};

const styles = StyleSheet.create({
  detailHr: {
    marginVertical: 2,
  },
});

export default memo(ShipmentItems);
