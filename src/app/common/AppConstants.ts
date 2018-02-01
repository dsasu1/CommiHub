export class AppConstants 
{

  public static readonly EmailMaxLength = 100;
  public static readonly PasswordMaxLength = 100;
  public static readonly FirstNameMaxLength = 250;
  public static readonly LastMaxLength = 200;
  public static readonly TextMaxLength = 200;
  public static readonly ZipMaxLength = 10;
  public static readonly PhoneMaxLength = 15;
  public static readonly Max100Length = 100;
  public static readonly Max250Length = 250;
  public static readonly Max500Length = 500;
  public static readonly Max1000Length = 1000;
  public static readonly Max2000Length = 2000;

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
