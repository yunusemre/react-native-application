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

export const taskStatusByColor = ({ status, ...props }: any) => {
  const { IsPunctual } = props;
  if (TaskStatusEnum.COMPLETED === status) {
    return 'primary';
  }
  if (TaskStatusEnum.CANCELLED === status) {
    return 'borderColor';
  }
  if (TaskStatusEnum.SUSPENDED === status) {
    return 'info';
  }
  if (!IsPunctual) {
    return 'danger';
  }
};

export const taskStatusByText = ({ status }: { status: number }) => {
  if (TaskStatusEnum.ASSIGNED === status) {
    return 'Atandı';
  }
  if (TaskStatusEnum.REJECTED === status) {
    return 'Reddedildi';
  }
  if (TaskStatusEnum.COMPLETED === status) {
    return 'Tamamlandı';
  }
  if (TaskStatusEnum.CANCELLED === status) {
    return 'İptal edildi';
  }
  if (TaskStatusEnum.SUSPENDED === status) {
    return 'Beklemede';
  }
  if (TaskStatusEnum.WAITING_TO_BE_ASSIGNED === status) {
    return 'Atanmayı bekliyor';
  }
};
