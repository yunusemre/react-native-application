import { Box, Text, UiCard, UiEmpy } from '@components/ui';
import { ActivityIndicator, RefreshControl, ScrollView } from 'react-native';

const Issues = ({
  dimentions,
  data,
  loading,
  navigation,
  isOnline,
  getProducts,
  isConnected,
}: any) => {
  return (
    <Box height={dimentions}>
      {loading && (
        <UiEmpy
          bg="white"
          textType="primary"
          mt={8}
          mb={8}
          p={8}
          text={
            <Box flexDirection="row" justifyContent="center">
              <ActivityIndicator />
              <Text ml={10}>Şu anda işlem gerçekleştiriliyor...</Text>
            </Box>
          }
        />
      )}
      {loading === false && data?.length === 0 && (
        <UiEmpy
          bg="warning"
          textType="textColor"
          mt={8}
          mb={8}
          p={8}
          text={
            <Box flexDirection="row">
              <ActivityIndicator />
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
            return <UiCard key={index} index={index + 1} navigation={navigation} {...item} />;
          });
        })}
      </ScrollView>
    </Box>
  );
};

export default Issues;
