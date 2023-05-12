import AsyncStorage from '@react-native-async-storage/async-storage';

export const removeOfflineList = async (id: string) => {
  const arr: any = await AsyncStorage.getItem('@offline');
  const parseArr: any = JSON.parse(arr);
  const filter = parseArr.filter((data: any) => data.id !== id);
  await AsyncStorage.setItem('@offline', JSON.stringify(filter));
};
