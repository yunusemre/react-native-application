import { DailyMissionStatusEnum } from '@types/enums';

export const dailyMissionStatusText = (status: number) => {
  if (DailyMissionStatusEnum.START_OF_DAY === status) {
    return 'Gün başlangıcı';
  } else if (DailyMissionStatusEnum.WAITING_FOR_EXIT_REQUEST_APPROVAL === status) {
    return 'Çıkış onayı bekleniyor';
  } else if (DailyMissionStatusEnum.EXIT_REQUEST_APPROVED === status) {
    return 'Çıkış onayı alındı';
  } else if (DailyMissionStatusEnum.MISSION_STARTED === status) {
    return 'Görev başladı';
  } else if (DailyMissionStatusEnum.MISSION_COMPLETED === status) {
    return 'Üzerinizdeki görevler tamamlanmıştır';
  } else if (DailyMissionStatusEnum.RECONCILED === status) {
    return 'Mutabakat';
  }
};
