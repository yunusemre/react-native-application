export enum TaskStatusEnum {
  UNKNOWN,
  ASSIGNED,
  FORWARDED,
  REJECTED,
  COMPLETED,
  CANCELLED,
  SUSPENDED,
  WAITING_TO_BE_ASSIGNED,
}

export const TaskStatusComponent = ({
  status,
  params = 'white',
}: {
  status: number | any;
  params: string;
}) => {
  let text: any = null;
  switch (TaskStatusEnum[status]) {
    case 'UNKNOWN':
      text = {
        val: 'Bilinmiyor',
        bg: 'white',
      };
      break;
    case 'ASSIGNED':
      text = {
        val: 'Atandı',
        bg: 'white',
      };
      break;
    case 'FORWARDED':
      text = {
        val: 'Yönlendirildi',
        bg: 'white',
      };
      break;
    case 'REJECTED':
      text = {
        val: 'Reddedildi',
        bg: 'borderColor',
      };
      break;
    case 'COMPLETED':
      text = {
        val: 'Tamamlandı',
        bg: 'primary',
      };
      break;
    case 'CANCELLED':
      text = {
        val: 'İptal',
        bg: 'borderColor',
      };
      break;
    case 'SUSPENDED':
      text = {
        val: 'Beklemede',
        bg: 'info',
      };
      break;
    case 'WAITING_TO_BE_ASSIGNED':
      text = {
        val: 'Atanmayı Bekliyor',
        bg: 'white',
      };
      break;

    default:
      text = {
        val: '',
        bg: 'white',
      };
      break;
  }
  return text[params];
};

export default TaskStatusComponent;
