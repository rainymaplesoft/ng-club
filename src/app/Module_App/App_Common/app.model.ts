export interface IAuthenticatedUser {
  userName: string;
  fullName: string;
  loginName: string;
  userId: number;
  isSysAdmin: boolean;
  isSchoolAdmin: boolean;
  isPricipal: boolean;
  isTeacher: boolean;
  isParent: boolean;
  isStudent: boolean;
  assessmentCode: string;
  role: string;
  claims: AppClaim[];
  token: string;
}

export class AppClaim {
  claimId: number;
  userId: number;
  claimType = '';
  claimValue = '';
}

export class Role {
  static Teacher = 'Teacher';
  static Principal = 'Principal';
  static Student = 'Student';
  static Parent = 'Parent';
  static SchoolAdmin = 'School Admin';
  static SystemAdmin = 'System Admin';
}
export class Client {
  static SD23 = 'SD23';
  static QPS = 'QPS';
  static CEPEO = 'CEPEO';
  static MOROCCO = 'MOROCCO';
}
