export enum TaskTypeEnum {
  PICKUP,
  DELIVERY,
}

export enum ShipmentItemStatusEnum {
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
