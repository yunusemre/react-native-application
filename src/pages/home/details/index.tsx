import Layout from '@components/layout';
import { Box, Text, UiPicker } from '@components/ui';
import { useAppSelector } from '@store/hooks';
import { globalStyle } from '@utils/global-style';
import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { issues } from './isssues';
import ShipmentItems from './shipment-items';

const HomeDetails = ({ navigation, checkList, route, setCheck }: any) => {
  const taskId = route.params.TaskId;
  const { data } = useAppSelector((state) => state.shipments);
  const { screenHeight } = useAppSelector((state) => state.apps);
  const { height, width }: { height: number; width: number } = Dimensions.get('window');
  const [selectedIssue, setSelectedIsseu] = useState();
  const [masterData, setMasterData] = useState<any>([]);
  const [taskItem, setTaskItem] = useState<any>({});

  const allItemCheckList = { ...checkList };
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    findShipmentList();
  }, []);

  const checkAllItems = (val: boolean) => {
    for (const [key] of Object.entries(allItemCheckList)) allItemCheckList[key] = !val;
    setCheck(allItemCheckList);
    setChecked(!val);
  };

  useEffect(() => {
    setChecked(false);
  }, [data]);

  const findShipmentList = () => {
    data.forEach((item) =>
      item.TaskList.find((ship: any) => {
        if (ship.TaskId === taskId) {
          setTaskItem(ship);
          setMasterData(ship.ShipmentList);
        }
      })
    );
  };

  return (
    <Layout isHeader isBottom hasBack={true}>
      <Box ml={8} mr={8} mt={4}>
        <Box flexDirection="row" height={40} justifyContent="space-between" alignItems="center">
          <UiPicker
            style={{ width: width - 18 }}
            items={issues}
            selectedValue={selectedIssue}
            onValueChange={(val: any) => setSelectedIsseu(val)}
          />
        </Box>
        <Box
          border={1}
          borderColor="borderColor"
          borderRadius={8}
          mb={4}
          mt={4}
          pt={4}
          pb={4}
          bg="white"
          flexDirection="row"
          alignItems="center"
          height={30}
        >
          <Box flexDirection="row" alignItems="center">
            <Checkbox
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => {
                checkAllItems(checked);
              }}
            />
            <Text>Gönderi listesi</Text>
          </Box>
          <Text>
            Adet: <Text style={[globalStyle.bold]}>{masterData.length}</Text>
          </Text>
        </Box>
        <ShipmentItems
          taskId={route.params.TaskId}
          dimentions={screenHeight - 88}
          navigation={navigation}
          data={masterData}
        />
      </Box>
    </Layout>
  );
};

export default HomeDetails;
