import Layout from '@components/layout';
import { Box, Text, UiPicker } from '@components/ui';
import { useAppSelector } from '@store/hooks';
import { globalStyle } from '@utils/global-style';
import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { Checkbox } from 'react-native-paper';
import UiCard from '../card';
import { issues } from './isssues';
import ShipmentItems from './shipment-items';

const HomeDetails = ({ navigation, checkList, route, setCheck }: any) => {
  const taskId = route.params.TaskId;
  const { data } = useAppSelector((state) => state.shipments);
  const { screenHeight } = useAppSelector((state) => state.apps);
  const { width }: { height: number; width: number } = Dimensions.get('window');
  const [selectedIssue, setSelectedIsseu] = useState();
  const [masterData, setMasterData] = useState<any>([]);
  const [taskItem, setTaskItem] = useState<any>(null);

  const allItemCheckList = { ...checkList };
  const [checked, setChecked] = useState(false);

  const checkAllItems = (val: boolean) => {
    for (const [key] of Object.entries(allItemCheckList)) allItemCheckList[key] = !val;
    setCheck(allItemCheckList);
    setChecked(!val);
  };

  useEffect(() => {
    findShipmentList();
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
  const layoutHeight = screenHeight - 196;
  return (
    <Layout isHeader isBottom hasBack={true}>
      <Box ml={8} mr={8} mt={4}>
        <Box mt={4} mb={4} height={102}>
          {taskItem === null || taskItem === undefined ? null : (
            <UiCard isDetailPage={true} navigation={navigation} {...taskItem} showDetail={true} />
          )}
        </Box>
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
          justifyContent="space-between"
          height={30}
        >
          <Box flexDirection="row" alignItems="center">
            <Checkbox.Android
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => {
                checkAllItems(checked);
              }}
            />
            <Text>Gönderi listesi</Text>
          </Box>
          <Text style={{ marginRight: 6 }}>
            Adet: <Text style={[globalStyle.bold]}>{masterData.length}</Text>
          </Text>
        </Box>
        {taskItem !== null ? (
          <ShipmentItems
            isConfirmAdress={taskItem.PartyDto.IsConfirmed}
            taskId={route.params.TaskId}
            dimentions={layoutHeight}
            navigation={navigation}
            data={masterData}
          />
        ) : null}
      </Box>
    </Layout>
  );
};

export default HomeDetails;
