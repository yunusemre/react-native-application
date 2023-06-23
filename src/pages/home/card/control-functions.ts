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
    return 'late';
  }
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
    for (let shipment of ShipmentList) {
      shipment.ShipmentItemList.find((shipment: any) => {
        if (
          shipment.ShipmentLocation === ShipmentItemStatusEnum.LOADED &&
          shipment.ShipmentItemStatus === ShipmentLocationStatus.ON_DELIVERY_COURIER &&
          shipment.CustomerBarcode == userInfo.UserId
        ) {
          isAllShipmentItemReadyForDelivery = true;
        } else {
          isAllShipmentItemReadyForDelivery = false;
        }
      });
    }
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
