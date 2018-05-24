export class Client {
  static SD23 = 'SD23';
  static QPS = 'QPS';
  static CEPEO = 'CEPEO';
  static MOROCCO = 'MOROCCO';
}

export class SideNavMode {
  static Over = 'over';
  static Push = 'push';
  static Side = 'side';
}

export class SideNavPosition {
  static Right = 'end';
  static Left = 'start';
}

// export class Confirm {
//   static Yes = 'YES';
//   static No = 'NO';
//   static Ok = 'OK';
// }

// export enum DirectionKey {
//   None = 0, Enter = 13, Left = 37, Up, Right, Down
// }

// export class ErrorCode {
//   static ServerError = '500';
//   static NotFound = '404';
//   static Unauthorized = '401';
// }
export enum SubAssessmentStatus {
  New = 0,
  Planned,
  ToBeApproved,
  Approved,
  Rejected,
  Cancelled,
  Completed
}

export class ValidationDataType {
  static Integer = 'Integer';
  static Decimal = 'Decimal';
  static Boolean = 'Boolean';
  static String = 'String';
  static Choice = 'Choice';
}

export class Role {
  static Teacher = 'Teacher';
  static Principal = 'Principal';
  static Student = 'Student';
  static Parent = 'Parent';
  static SchoolAdmin = 'School Admin';
  static SystemAdmin = 'System Admin';
}

export class ClaimType {
  static IsSysAdmin = 'IsSysAdmin';
  static IsSchoolAdmin = 'IsSchoolAdmin';
  static IsPricipal = 'IsPricipal';
  static IsTeacher = 'IsTeacher';
  static IsParent = 'IsParent';
  static IsStudent = 'IsStudent';
}

export class UserSettingType {
  static ShowAllSubAssessments = 'ShowAllSubAssessments';
}

export class CellType {
  static Text = 'Text';
  static Comment = 'Comment';
  static Checkbox = 'Checkbox';
}

export enum StudentView {
  StandardStudentView = 1,
  GridStudentView = 2
}

export enum SortOrder {
  NONE,
  ACS,
  DECS
}
