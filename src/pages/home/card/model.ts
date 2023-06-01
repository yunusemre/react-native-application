export interface PartyDtoModel {
  Name: string;
  AddressText: string;
  Gsm: string;
  Latitude: number;
  Longitude: number;
  IsConfirmed: boolean;
  CounterLocation: any | null;
}

export interface IUICard {
  isCheck: boolean;
  PartyDto: PartyDtoModel;
  TaskStatus?: number;
  TaskType?: number;
  navigation: any;
  IsReturn?: number;
  StopOrder?: number;
  TaskId?: number | any;
  TimePeriodId?: number;
  ShipmentList?: any;
  IsPunctual?: boolean | any;
  IsSamedayDelivery: boolean;
  setCheck: any;
  itemCount: number;
  customerTrackingId: string;
  OnlyDeliverToRecipient: boolean;
  IsPartyAtTheAddress: boolean;
  IsLate: boolean;
  IsRingTheBellPermitted: boolean;
  IsCollectionRequired: boolean;
  IsDeliveryInsideTimeWindow: boolean;
  TimePeriodModel: any;
}
