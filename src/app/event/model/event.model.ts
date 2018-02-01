export class EventMod {
  id: string;
  userId: string;
  eventName: string;
  details: string;
  propertyInformationId: string;
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
  startTimeType: string;
  endTimeType: string;
  isAllDayEvent: boolean;
  shareWithEnum: string;
  rsvpMaybe: number;
  rsvpYes: number;
  rsvpNo: number;
  addedDateUtc: Date;
  constructor() { }
}
