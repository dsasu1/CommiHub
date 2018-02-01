export class ServiceRequestMod {
  id: string;
  title: string;
  details: string;
  phone: string;
  givePermission: boolean;
  havePet: boolean;
  haveAlarm: boolean;
  userName: string;
  userPhoto: any;
  userId: string;
  tenantUnitId: string;
  tenantUnitAddress: string;
  requestStatusKey: string;
  propertyInformationId: string;
  addedDateUtc: Date;
  constructor() { }
}

export class ServiceRequestStatusMod {
  id: string;
  userId: string;
  statusKey: string;
}
