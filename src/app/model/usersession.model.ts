import { UserType, User } from './users.model';
import { PropertyInformation } from '../property/model/property.model';
import { AvailableRole } from '../role/model/role.model';


export class UserSession {

  isManager: boolean;
  userTypeId: string;
  userTypeTitle: string;
  userTypeEnum: string;
  userVM: User;
  managementId: string;
  noPropertyRedirectPage: string;
  constructor() { }

}
