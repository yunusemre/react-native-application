import { Box, Text, UiEmpy } from '@components/ui';
import { memo } from 'react';
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
  setCheck,
}: any) => {
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
      >
        <Checkbox status="unchecked" onPress={() => {}} />
        <Text>Tümünü Seç</Text>
      </Box>
      <Box height={dimentions}>
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
                  customerTrackingId={customerTrackingId}
                  itemCount={sumShipmentItemListCount}
                  setCheck={(res: number) => {
                    console.log(res);
                  }}
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
