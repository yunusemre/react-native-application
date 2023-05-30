import Layout from '@components/layout';
import { Box, UiPicker } from '@components/ui';
import Constants from 'expo-constants';
import { useCallback, useState } from 'react';
import { Dimensions, ScrollView } from 'react-native';
import { actions } from '../actions';
import assignments from '../assignment';
import ShipmentItems from './shipment-items';

const HomeDetails = ({ navigation, route }: any) => {
  //   const data: any[] = [];
  const { height }: { height: number } = Dimensions.get('screen');
  //   const [showSearch, setShowSearch] = useState(false);
  const [selectedIssue, setSelectedIsseu] = useState();
  const [selectedAction, setSelectedAction] = useState();
  const [search, setSearch] = useState('');
  const [dimentions, setDimentions] = useState(0);
  const [masterData, setMasterData] = useState<any[]>([]);

  const findDimesions = useCallback((layout: any) => {
    const { height: layoutHeight } = layout;
    setDimentions(height - (layoutHeight + 40 + Constants.statusBarHeight + 60));
  }, []);

  //   const searchList = (text: string) => {
  //     setSearch(text);
  //     if (text) {
  //       const searchData = data.filter((obj: any) =>
  //         JSON.stringify(obj.TaskList).toLowerCase().includes(text.toLowerCase())
  //       );
  //       setMasterData(searchData);
  //     } else {
  //       setMasterData(data);
  //     }
  //   };

  return (
    <Layout isHeader hasBack={true}>
      <Box ml={8} mr={8} mt={4}>
        <Box onLayout={(event: any) => findDimesions(event.nativeEvent.layout)}>
          <Box flexDirection="row" justifyContent="space-around" mb={2} height={40}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <UiPicker
                minWidth={160}
                items={assignments}
                selectedValue={selectedIssue}
                onValueChange={(val: any) => setSelectedIsseu(val)}
              />
              <UiPicker
                minWidth={160}
                items={actions}
                selectedValue={selectedAction}
                onValueChange={(val: any) => setSelectedAction(val)}
              />
            </ScrollView>
          </Box>
        </Box>
        <Box height={dimentions}>
          <ShipmentItems navigation={navigation} data={route.params} />
        </Box>
      </Box>
    </Layout>
  );
};

export default HomeDetails;
