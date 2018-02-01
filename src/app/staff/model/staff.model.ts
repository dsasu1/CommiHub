export class StafffRole {
  roleId: string;
  userId: string;
  staffRoleInput: Staff[];

}

export class Staff {
  id: string;
  serviceCodeValues: string[];
  serviceCode: string;
  userName: string;
  roleName: string;
  roleId: string;
  userId: string;
  staffRoleId: string;
  userPhoto: any;
  title: string;
  isDemoAccount: boolean;
  managementUserId: string;
  creatorUserId: string;

  constructor() { }
}
