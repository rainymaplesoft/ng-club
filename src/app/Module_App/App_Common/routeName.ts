export class RouteName {
  get default() {
    return '';
  }
  static Home = '';
  static Prefix = RouteName.Home === '' ? '' : RouteName.Home + '/';
  static Exception = RouteName.Prefix + 'error';
  static Landing = RouteName.Prefix + 'landing';
  static Profile = RouteName.Prefix + 'profile';
  static ProfileWithParams = RouteName.Prefix +
    'profile/:studentId/:reportName';
  static ProfileReport = RouteName.Prefix +
    'profileReport/:studentId/:reportName';
  static DataEntry = RouteName.Prefix + 'data_entry';
  static Class = 'class';
  static Class_Full = RouteName.DataEntry + '/class';
  static Student = 'student';
  static Student_Path = RouteName.DataEntry + '/student';
  static Admin = RouteName.Prefix + 'admin';
  static Admin_Assessment = 'assessment';
  static Admin_Assessment_Full = RouteName.Admin + '/assessment';
  static Admin_AssessmentEdit = 'assessment_edit/:id';
  static Admin_AssessmentEdit_Full = RouteName.Admin + '/assessment_edit';
  static Admin_QuestionEdit = 'question_edit/:assessmentId/:subAssessmentId/:id';
  static Admin_QuestionEdit_Full = RouteName.Admin + '/question_edit';
  static Admin_ColorRuleEdit = 'color_rule_edit/:assessmentId/:subAssessmentId/:subAssessmentItemId/:id';
  static Admin_ColorRuleEdit_Full = RouteName.Admin + '/color_rule_edit';
  static Admin_SubAssessmentEdit = 'subassessment_edit/:assessmentId/:id/:withLastRoute';
  static Admin_SubAssessmentEdit_Path = RouteName.Admin + '/subassessment_edit';
  static Admin_Competency = 'competency/:assessmentId/:subAssessmentId/:subAssessmentItemId';
  static Admin_Competency_Full = RouteName.Admin + '/competency';
  static Admin_SubAssessmentClassEdit = 'subAssessmentClass_edit/:assessmentId/:subAssessmentId/:gradeId';
  static Admin_SubAssessmentClassEdit_Full = RouteName.Admin +
    '/subAssessmentClass_edit';

  static GeoInfo = RouteName.Prefix + 'geoinfo';
  static GeoSchoolInfo = 'schoolinfo';

  static Terminology = RouteName.Prefix + 'i18n';
  static TermsEdit = 'termsedit';
  static EditClient = 'editclient';
  static ManageTerm = 'manageterm';

  static DefaultRoute = RouteName.Landing;
}
export default RouteName;
