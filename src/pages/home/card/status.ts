import { TaskStatusEnum } from '@types/enums';

export const taskStatusByColor = ({ status, ...props }: any) => {
  const { IsPunctual, isAllShipmentItemReadyForDelivery } = props;
  if (isAllShipmentItemReadyForDelivery) {
    return 'warning';
  }
  if (TaskStatusEnum.COMPLETED === status) {
    return 'lightPrimary';
  } else if (TaskStatusEnum.CANCELLED === status) {
    return 'borderColor';
  } else if (TaskStatusEnum.SUSPENDED === status) {
    return 'info';
  }
  if (!IsPunctual) {
    return 'danger';
  }
};
