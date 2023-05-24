import { Box, Text, UiCard, UiEmpy } from '@components/ui';
import { memo, useMemo } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
    <Box height={dimentions}>
      {loading && (
        <UiEmpy
          border={0.5}
          borderColor="borderColor"
          bg="white"
          mt={8}
          mb={8}
          p={12}
          text="Şu anda işlem gerçekleştiriliyor..."
        />
      )}
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
            const sumShipmentItemListCount = useMemo(
              () =>
                item.ShipmentList.reduce(
                  (accumulator: any, currentValue: any) =>
                    accumulator + currentValue.ShipmentItemList?.length,
                  0
                ),
              []
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
                  setCheck(res);
                }}
                key={index}
                index={index + 1}
                navigation={navigation}
                {...item}
              />
            );
          });
        })}
      </ScrollView>
    </Box>
  );
};

export default memo(Issues);
