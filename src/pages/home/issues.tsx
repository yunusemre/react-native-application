import { UiCard, UiEmpy } from '@components/ui';
import { useAppSelector } from '@store/hooks';
import { FlatList } from 'react-native';

const Issues = ({ navigation, isOnline, getProducts, isConnected }: any) => {
  const { data, loading } = useAppSelector((state) => state.shipments);
  return (
    <FlatList
      refreshing={loading}
      onRefresh={async () => {
        if (isConnected) {
          await isOnline();
          await getProducts();
        }
      }}
      data={data}
      renderItem={({ item, index }: any) => (
        <UiCard index={index + 1} navigation={navigation} {...item} />
      )}
      keyExtractor={(item: any) => item.TaskId}
      ListEmptyComponent={
        <UiEmpy
          bg="primary"
          textType="white"
          mt={8}
          p={8}
          text="Şu anda gösterilecek bir data bulunamadı."
        />
      }
    />
  );
};

export default Issues;
