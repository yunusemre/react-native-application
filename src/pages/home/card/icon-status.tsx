import { Box } from '@components/ui';
import { TaskTypeEnum } from '@types/enums';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const IconStatus = ({
  TaskType,
  ShipmentList,
  IsRingTheBellPermitted,
  IsConfirmed,
  TimePeriodModel,
  IsPartyAtTheAddress,
}: any) => {
  return (
    <Box flexDirection="row" flexWrap="wrap" gap={4}>
      {ShipmentList.length != 0 && ShipmentList.some((ship: any) => ship.Neighbour != null) ? (
        <Icon name="alert-circle-outline" size={18} />
      ) : null}

      {!IsRingTheBellPermitted ? <Icon name="bell-off" size={18} /> : null}

      {(TaskType === TaskTypeEnum.PICKUP || TaskType === TaskTypeEnum.DELIVERY) &&
      TimePeriodModel !== null &&
      TimePeriodModel.TimePeriodId > 0 ? (
        <Icon name="alarm-check" size={18} />
      ) : null}

      {TaskType == TaskTypeEnum.PICKUP && ShipmentList.some((ship: any) => ship.IsReturn) ? (
        <Icon name="basket" size={18} />
      ) : null}

      {IsPartyAtTheAddress ? <Icon name="home" size={18} /> : null}

      {ShipmentList.some((ship: any) => ship.OnlyDeliverToRecipient) ? (
        <Icon name="face-man" size={18} />
      ) : null}

      {ShipmentList.some((ship: any) => ship.IsCollectionRequired) ? (
        <Icon name="cash" size={18} />
      ) : null}

      {ShipmentList.some((ship: any) => ship.IsDeliveryInsideTimeWindow) ? (
        <Icon name="truck-fast-outline" size={18} />
      ) : null}

      {ShipmentList.some((ship: any) => ship.IsSamedayDelivery) ? (
        <Icon name="hours-24" size={18} />
      ) : null}

      {IsConfirmed ? <Icon name="check-circle-outline" size={18} /> : null}
    </Box>
  );
};
