import { ZipCode } from '../../model/global.model';

export class PropertyInformation {
  id: string;
  userId: string;
  managementUserId: string;
  propName: string;
  propCode: string;
  urlFriendlyName: string;
  aboutUs: string;
  streetOne: string;
  streetTwo: string;
  propType: string;
  zipId: string;
  phone: string;
  fax: string;
  email: string;
  weburl: string;
  propTimezone: string;
  coverOriginal: any;
  coverThumbnail: any;
  isLive: string;
  isPropManage: boolean;
  zipCode: ZipCode = new ZipCode();
  isDemoAccount: boolean;

  constructor() { }
}


export class TenantUnit {
  id: string;
  userId: string;
  propertyCode: string;
  propertyInformationId: string;
  unitAddress: string;
  unitName: string;
  isDefault: boolean;
  isApproved: boolean;
  isMovedOut: boolean;
  constructor() { }
}





export class Hour {
  id: string;
  propertyInformationId: string;
  dayKey: string;
  openTime: string;
  openTimeType: string;
  closeTime: string;
  closeTimeType: string;
  isClosed: boolean;
  version: any;
  constructor() { }
}


export class PropertyType {
  id: string;
  title: string;
  isValid: boolean;
  propertyTypeEnum: string;
  constructor() { }
}


export class HourVM {
  propertyInformationId: string;
  userId: string;
  hours: Hour[];
  constructor() {
    this.hours = new Array<Hour>();
  }

}

export class PropertyAccess {
  id: string;
  roleId: string;
  propertyInformationId: string;
  isValid: boolean;
}

export class PropertyAccessForm {

  roleId: string;
  userId: string;
  propertyInfos: PropertyInformation[];
}

