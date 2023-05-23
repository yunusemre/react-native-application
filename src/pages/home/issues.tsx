import { UiCard } from '@components/ui';
import { FlatList } from 'react-native';

const Issues = ({ data, loading, navigation, isOnline, getProducts, isConnected }: any) => {
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
    />
  );
};

export default Issues;
