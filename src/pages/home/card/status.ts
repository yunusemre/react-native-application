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

const TaskStatusComponent = ({
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

const taskStatusFunction = ({
  status,
  IsPunctual,
}: {
  status: number | any;
  IsPunctual?: boolean;
}) => {
  if (TaskStatusEnum[status] === 'UNKNOWN') {
    return '';
  }
  if (TaskStatusEnum[status] === 'ASSIGNED') {
    return '';
  }
  if (TaskStatusEnum[status] === 'FORWARDED') {
    return '';
  }
  if (TaskStatusEnum[status] === 'REJECTED') {
    return 'danger';
  }
  if (TaskStatusEnum[status] === 'COMPLETED') {
    return 'primary';
  }
  if (TaskStatusEnum[status] === 'CANCELLED') {
    return 'canceled';
  }
  if (TaskStatusEnum[status] === 'SUSPENDED') {
    return 'info';
  }
  if (TaskStatusEnum[status] === 'WAITING_TO_BE_ASSIGNED') {
    return '';
  }
  if (!IsPunctual) {
    return 'danger';
  }
};

export { TaskStatusComponent, taskStatusFunction };
