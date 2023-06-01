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
        bg: '',
      };
      break;
    case 'ASSIGNED':
      text = {
        val: 'Atandı',
        bg: '',
      };
      break;
    case 'FORWARDED':
      text = {
        val: 'Yönlendirildi',
        bg: '',
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
        bg: '',
      };
      break;

    default:
      text = '';
      break;
  }
  return text[params];
};

export default TaskStatusComponent;
