export class UserType {
    title: string;
    id: string;
    userTypeEnum: string;
    constructor(){}
}


export class User{
    firstName: string;
    vericationCodeId: string;
    securityQuestionId: string;
    securityQuestion: string;
    userSecurityAns: string;
    email: string;
    userTypeEnum: string;
    password: string;
    newPassword: string;
    confirmPassword: string;
    photoOriginal: string;
    photoThumbnail: any;
    lang: string = 'en';
    isAcceptedTerms: boolean  = false;
    rememberMe: boolean = false;
    userName: string;
    changeType: string;
    serviceCode: string;
    lastName: string;
    id: string;
    loginSessionId: string;
    isDemoAccount: boolean;
  constructor(){}
}


