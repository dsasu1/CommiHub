export class PsMaxLengths{
  public  EmailMaxLength:number = 100;
  public  PasswordMaxLength:number = 100;
  public  FirstNameMaxLength:number = 250;
  public  LastNameMaxLength:number = 200;
  public  TextMaxLength:number = 200;
  public  ZipMaxLength:number = 10;
  public  PhoneMaxLength:number = 15;
  public  Max100Length:number = 100;
  public  Max250Length:number = 250;
  public  Max500Length:number = 500;
  public  Max1000Length:number = 1000;
  public  Max2000Length:number = 2000;
}

export class AppConstants 
{

  public static readonly AcceptTermsError = "AcceptTermsError"; 
  public static readonly ConfirmPasswordMatchError = "ConfirmPasswordMatchError";
  public static readonly InvalidAccount = "InvalidAccount"; 
  public static readonly SomethingWrong = "SomethingWrong";
  public static readonly ConnectionLostError = "ConnectionLostError";
  public static readonly RobotVerify = "RobotVerify";
  public static readonly CheckEmailForStep = "CheckEmailForStep";
  public static readonly InvalidPassword = "SomethingWrong";
  public static readonly EmailTaken = "ConnectionLostError";
  public static readonly UserNameTaken = "CheckEmailForStep";
  public static readonly Successful = "Successful";
  public static readonly Select = "Select";

  public static readonly ClassAlertSuccess = "success";
  public static readonly ClassAlertInfo = "info";
  public static readonly ClassAlertDanger = "error";

  public static readonly Days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]


  public static readonly SessionKeyUser = "sessionKeyUser";
  public static readonly SessionKeyRemember = "sessionKeyRemember";
  public static readonly SessionKeySessionInfo = "sessionKeySessionInfo";
  
  constructor() { }

}

export enum UserTypeEnum {
    Tenant,
    ManagementCompany,
    ManagementPersonnel,
}

export enum ShareWithEnum {
  Property,
  Zip,
  County,
  City,
  Country
}

export enum PSUploadType {
  CoverImage,
  Photos,
  Forms,
  FloorPlans,
  ProfilePic

}

export enum ChangeType {
    SecurityQuestion,
    PersonalInfo,
    PasswordChange

}

export enum PSNotificationType {
  ServiceRequest,
  Residents,
  CommentCard,
  Review,
  Role,
  Staff,
  Event,
  NewsPost,
  Property

}
