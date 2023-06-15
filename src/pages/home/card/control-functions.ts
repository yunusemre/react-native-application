import {
  DailyMissionStatusEnum,
  ShipmentItemStatusEnum,
  ShipmentLocationStatus,
  TaskStatusEnum,
  TaskTypeEnum,
} from '@types/enums';

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

export const checkAllShipmentItemReadyForDelivery2 = ({
  TaskType,
  TaskStatus,
  dailyMissionStatus,
  ShipmentList,
  userID,
}: any) => {
  let isAllShipmentItemReadyForDelivery2: boolean = false;
  if (
    TaskType == TaskTypeEnum.DELIVERY &&
    TaskStatus != TaskStatusEnum.COMPLETED &&
    (dailyMissionStatus == DailyMissionStatusEnum.START_OF_DAY ||
      dailyMissionStatus == DailyMissionStatusEnum.WAITING_FOR_EXIT_REQUEST_APPROVAL)
  ) {
    ShipmentList.forEach((item: any) => {
      item.ShipmentItemList.forEach((itemList: any) => {
        const shipmentItemStatusEnumInstance: any =
          ShipmentItemStatusEnum[itemList.ShipmentItemStatus];
        const shipmentLocationStatusEnumInstance: any =
          ShipmentLocationStatus[itemList.ShipmentLocation];
        if (
          shipmentItemStatusEnumInstance == ShipmentItemStatusEnum.LOADED &&
          shipmentLocationStatusEnumInstance == ShipmentLocationStatus.ON_DELIVERY_COURIER &&
          itemList.CurrentWithholderUserId == userID
        ) {
          isAllShipmentItemReadyForDelivery2 = true;
        } else {
          isAllShipmentItemReadyForDelivery2 = false;
        }
      });
    });
  }
  return isAllShipmentItemReadyForDelivery2;
};

export const checkAllShipmentItemReadyForDelivery = ({
  TaskType,
  TaskStatus,
  dailyMissionStatus,
  ShipmentList,
  userInfo,
}: any) => {
  let isAllShipmentItemReadyForDelivery = false;
  if (
    TaskType == TaskTypeEnum.DELIVERY &&
    TaskStatus != TaskStatusEnum.COMPLETED &&
    (dailyMissionStatus == DailyMissionStatusEnum.START_OF_DAY ||
      dailyMissionStatus == DailyMissionStatusEnum.WAITING_FOR_EXIT_REQUEST_APPROVAL)
  ) {
    ShipmentList.forEach((shipment: any) => {
      shipment.ShipmentItemList.forEach((shipment: any) => {
        let shipmentItemStatusEnumInstance = shipment.ShipmentLocation;
        const shipmentLocationStatusEnumInstance = shipment.ShipmentItemStatus;
        if (
          shipmentItemStatusEnumInstance === ShipmentItemStatusEnum.LOADED &&
          shipmentLocationStatusEnumInstance === ShipmentLocationStatus.ON_DELIVERY_COURIER &&
          shipment.CustomerBarcode == userInfo.UserId
        ) {
          isAllShipmentItemReadyForDelivery = true;
        } else {
          isAllShipmentItemReadyForDelivery = false;
        }
      });
    });
  }
  return isAllShipmentItemReadyForDelivery;
};

export const selectedTaskID = () => {};

export const nextActiveTask = ({}) => {};

// const getSelectedTaskInfo = (context:any) => {
//   for (CourierTaskResponseModel task : getCourierTaskResponseModelList(context)) {
//       if(task.getTaskId() == Constants.getSPreferences(context).getSELECTED_TASK_ID()){
//           return task;
//       }
//   }
//   return null;
// }

// const getCourierTaskResponseModelList = (context:any) => {
//   const taskList:any[] = [];
//   if(!Constants.getSPreferences(context).getCOURIER_TASK_LIST().isEmpty()){
//       taskList = gson.fromJson(Constants.getSPreferences(context).getCOURIER_TASK_LIST(),new TypeToken<List<CourierTaskResponseModel>>(){}.getType());
//   }
//   return taskList;
// }

// for (CourierTaskResponseModel courierTaskResponseModel :  Extensions.getCourierTaskResponseModelList(requireContext())) {
//   Extensions.TaskStatus taskStatusEnumInstance = Extensions.TaskStatus.enumOf(courierTaskResponseModel.getTaskStatusId());
//   if (taskStatusEnumInstance == Extensions.TaskStatus.ASSIGNED) {
//       if(courierTaskResponseModel.getTaskTypeId() == Extensions.TaskType.DELIVERY.value){
//           if(!isDeliveryTaskCompleted(courierTaskResponseModel)){
//               Constants.getSPreferences(requireContext()).setNEXT_TASK_ID(courierTaskResponseModel.getTaskId());
//               break;
//           }
//       }
//       else{
//           Constants.getSPreferences(requireContext()).setNEXT_TASK_ID(courierTaskResponseModel.getTaskId());
//           break;
//       }
//   }
// }
