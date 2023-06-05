import { DailyMissionStatus } from '@types/enums';

export const dailyMissionStatusText = (status: number) => {
  if (DailyMissionStatus.START_OF_DAY === status) {
    return 'Gün başlangıcı';
  } else if (DailyMissionStatus.WAITING_FOR_EXIT_REQUEST_APPROVAL === status) {
    return 'Çıkış onayı bekleniyor';
  } else if (DailyMissionStatus.EXIT_REQUEST_APPROVED === status) {
    return 'Çıkış onayı alındı';
  } else if (DailyMissionStatus.MISSION_STARTED === status) {
    return 'Görev başladı';
  } else if (DailyMissionStatus.MISSION_COMPLETED === status) {
    return 'Üzerinizdeki görevler tamamlanmıştır';
  } else if (DailyMissionStatus.RECONCILED === status) {
    return 'Mutabakat';
  }
};
