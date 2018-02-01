
export class ResidentsVM {
  id: string;
  userId: string;
  propertyInformationId: string;
  unitAddress: string;
  userName: string;
  userPhoto: string;
  unitName: string;
  isDefault: boolean;
  isApproved: boolean;
  isMovedOut: boolean;
  isDemoAccount: boolean;
  constructor() { }
}

export class ResidencyStatusVM {
  id: string;
  residentUserId: string;
  changerUserId: string;
  propertyInformationId: string;
  statusType: any; // MoveOut Approval Cancel
  changeValue: boolean; 
}
