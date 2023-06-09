enum TaskTypeEnum {
  PICKUP,
  DELIVERY,
}

enum ShipmentItemStatusEnum {
  UNKNOWN = 0,
  SHIPPING_REQUESTED = 1,
  PICKUP_CANCELLED = 2,
  PICKUP_DONE = 10,
  LOADED = 20,
  UNLOADED = 30,
  DELIVERED = 40,
  NOT_FOUND = 90,
  MISSING = 100,
  DAMAGED = 110,
}

enum DailyMissionStatus {
  START_OF_DAY = 1,
  WAITING_FOR_EXIT_REQUEST_APPROVAL = 2,
  EXIT_REQUEST_APPROVED = 3,
  MISSION_STARTED = 4,
  MISSION_COMPLETED = 5,
  RECONCILED = 6,
}

enum TaskStatusEnum {
  UNKNOWN = 0,
  ASSIGNED = 1,
  FORWARDED = 2,
  REJECTED = 3,
  COMPLETED = 4,
  CANCELLED = 5,
  SUSPENDED = 6,
  WAITING_TO_BE_ASSIGNED = 7,
}

enum ShipmentLocationStatus {
  /// 0 Bilinmeyen
  UNKNOWN = 0,
  /// 1 Müşteride
  ON_CUSTOMER = 1,
  /// 2 Toplama Kuryesinde
  ON_PICKUP_COURIER = 2,
  /// 4 Toplama transfer merkezinde
  ON_PICKUP_HUB = 4,
  /// 8 Ana hat aracında
  ON_LINEHAUL_VEHICLE = 8,
  /// 16 Dağıtım transfer merkezinde
  ON_DELIVERY_HUB = 16,
  /// 32 Dapıtım kuryesnde
  ON_DELIVERY_COURIER = 32,
  /// 64 ON_RETURN_DESK
  ON_RETURN_DESK = 64,
  /// 128 Alıcı müşteride
  ON_RECIPENT_CUSTOMER = 128,
}

enum TaskCompletionReasonEnum {
  DEFAULT = 0,
  SENDER_PROVIDE_DEFICIENTLY = 1, //Müşteri eksik teslim ettiRE
  VEHICLE_CAPACITY_INADEQUATE = 2, // Kurye aracına sığmıyor
  ADDRESS_CHANGED = 3, //  Adres değişti
  DELIVERY_TIME_CHANGED = 4, // Teslimat zamanı değişti
  PICKUP_CANCELLED = 5,
  PARTY_NOT_FOUND_AT_HER_ADDRESS = 6,
  DELIVERY_FAILED = 7,
  FORWARDED = 8,
  MISSING = 9,
  NOT_ENOUGH_TIME = 10,
  OUT_OF_CARGO_STANDARD = 11,
  PRICING_PROBLEM = 12,
  BANNED_SHIPPING_CONTENT = 13,
  CONTENT_DAMAGED = 14,
  DELIVERY_CANCELLED = 15,
  PICKUP_DATE_CHANGED = 16,
  WORKPLACE_CLOSED = 20,
}

export {
  TaskTypeEnum,
  ShipmentItemStatusEnum,
  DailyMissionStatus,
  TaskStatusEnum,
  ShipmentLocationStatus,
  TaskCompletionReasonEnum
};
