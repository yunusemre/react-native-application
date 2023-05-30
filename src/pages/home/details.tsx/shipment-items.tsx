import { Box, Text, UiEmpy } from '@components/ui';
import { memo } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ShipmentItems = ({ data, loading, navigation }: any) => {
  return (
    <Box mb={8} pt={4} pb={4}>
      {loading ? (
        <UiEmpy
          border={0.5}
          borderColor="borderColor"
          bg="white"
          mt={8}
          mb={8}
          p={12}
          text="Şu anda işlem gerçekleştiriliyor..."
        />
      ) : null}
      {loading === false && data.ShipmentItemList.length === 0 ? (
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
      ) : null}
      <ScrollView>
        {data.map((result: any) => {
          return result.ShipmentItemList.map((item: any, indexS: number) => {
            return (
              <Box
                border={1}
                borderColor="borderColor"
                borderRadius={8}
                color="white"
                bg="white"
                key={item.ShipmentId}
                p={8}
                mb={8}
              >
                <Text style={styles.detailHr}>Gönderi Takip No: {result.ShipmentId}</Text>
                <Text style={styles.detailHr}>Müşteri Takip No: {item.CustomerTrackingId}</Text>
                <Text style={styles.detailHr}>
                  İade Gönderi: {result.ReturnType === 0 ? 'Hayır' : 'Evet'}
                </Text>
                <Text style={styles.detailHr}>Onaylu Adres: -</Text>
                <Text style={styles.detailHr}>Gönderi Tipi: -</Text>
                <Text style={styles.detailHr}>Parça Sayısı: {result.ShipmentItemList.length}</Text>
                <Text style={styles.detailHr}>Toplam Desi: {item.Deci}</Text>
                <Text style={styles.detailHr}>Toplam Ağırlık: {item.Weight}</Text>
                <Text style={styles.detailHr}>Gel Al Paket: -</Text>
              </Box>
            );
          });
        })}
      </ScrollView>
    </Box>
  );
};

const styles = StyleSheet.create({
  detailHr: {
    marginVertical: 4,
  },
});

// const a = {
//   CurrentWithholderUserId: 0,
//   CustomerBarcode: 'KGIT-92667',
//   CustomerTrackingId: '87976',
//   Deci: 8,
//   Height: 0,
//   Length: 0,
//   PreprintedBarcode: null,
//   ShipmentId: 87976,
//   ShipmentItemId: 92667,
//   ShipmentItemStatus: 1,
//   ShipmentLocation: 1,
//   UnitPrice: 36.22,
//   Weight: 8,
//   Width: 0,
// };

const a = {
  CounterLocation: null,
  CustomerSpecificCode: null,
  DeliveryDate: '2023-05-10T00:00:00',
  DeliveryTime: { FinishTime: '18:00:00', StartTime: '09:00:00', TimePeriodId: 1 },
  IsCollectionRequired: false,
  IsDeliveryInsideTimeWindow: false,
  IsReturn: true,
  IsSamedayDelivery: false,
  MarketPlaceCustomerId: 0,
  Neighbour: null,
  OTPRequiredForDelivery: false,
  OnlyDeliverToRecipient: false,
  PackageType: 1,
  PickupDate: '2023-03-02T00:00:00',
  PickupTime: { FinishTime: '18:00:00', StartTime: '09:00:00', TimePeriodId: 1 },
  RecipientIdentityNumber: '78380545404',
  RecipientName: '',
  RecipientSurname: null,
  ReturnType: 0,
  SenderIdentityNumber: '3300936366',
  SenderInvoiceAmount: 0,
  SenderName: 'Ekol Ekspres Kargo A.Ş.  ',
  ShipmentId: 83141,
  ShipmentItemList: [
    {
      CurrentWithholderUserId: 0,
      CustomerBarcode: 'KGIT-87345',
      CustomerTrackingId: '83140',
      Deci: 0,
      Height: 1,
      Length: 1,
      PreprintedBarcode: null,
      ShipmentId: 83141,
      ShipmentItemId: 87346,
      ShipmentItemStatus: 30,
      ShipmentLocation: 16,
      UnitPrice: 17.2,
      Weight: 1,
      Width: 1,
    },
  ],
  ShipmentPrice: 0,
  ShipmentToDoList: [],
};

export default memo(ShipmentItems);
