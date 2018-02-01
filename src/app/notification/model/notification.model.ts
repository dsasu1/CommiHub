export class NotifictionMod {
  id: string;
  userName: string;
  propertyInformationId: string;
  userId: string;
  notificationResourceKey: string;
  notificationAdditionalInfo: string;
  notifeeUserId: string;
  notificationTypeEnum: string;
  notificationShowFor: string;
  notificationTypeId: string;
  notificationProcessed: boolean;
  addedDateUtc: Date;
  constructor() {}
}

export class NotificationMasterMod {

  lastViewDateUTC: Date;
  nonViewedCount: number;
  notificationVMS: NotifictionMod[];
  constructor() { }
}
