import BaseUrl from "./BaseUrl";

const UPLOAD_IMAGE = BaseUrl + 'api/media/upload'


const REGISTER_URL = BaseUrl + 'api/user/register/email';
const LOGIN_URL = BaseUrl + 'api/user/login/email';
const SEND_OTP = BaseUrl + 'api/user/send/otp/email';
const VERIFY_OTP = BaseUrl + 'api/user/verify-otp';
const VERIFY_EMAIL = BaseUrl + 'api/user/verify-email';
const VERIFY_AND_UPDATE_PASSWORD = BaseUrl + 'api/user/verify/password';
const GET_USER = (userID) => BaseUrl + `api/user/${userID}`;
const GET_CLASSES = BaseUrl + `api/class-management/enrolled-classes`;

const EDIT_PROFILE = BaseUrl + 'api/user/profile'
const CHANGE_PASSWORD = BaseUrl + 'api/user/verify-and-update-password'

const INSTRUCTOR_START_CLASS = BaseUrl + 'api/attendance-management/start-attendance-with-code'
const CLASS_ATTENDANCE_STATUS = BaseUrl + 'api/attendance-management/check-attendance-status'
const MARKK_ATTENDANCE = BaseUrl + 'api/attendance-management/mark-attendance'
const FETCH_ATTENDANCE = BaseUrl + 'api/attendance-management/fetch-attendance-details'
const FETCH_ALL_MISSED_CLASSES = BaseUrl + 'api/attendance-management/fetch-missed-classes'

const EXCUSE_ABSENCE = BaseUrl + 'api/attendance-management//request-excused-attendance'

const ATTENDENCE_HISTORY = BaseUrl + 'api/attendance-management/get-attendance-report-of-student'


const GET_NOTIFICATION = BaseUrl + 'api/notifications/get-user-notifications'
const READ_NOTIFICATION = BaseUrl + 'api/notifications/read-notifications'





export const API_URLS = {
    UPLOAD_IMAGE,
    REGISTER_URL, LOGIN_URL, SEND_OTP, VERIFY_OTP, VERIFY_EMAIL, VERIFY_AND_UPDATE_PASSWORD, GET_USER, // Auth APIs
    GET_CLASSES, //Class management
    EDIT_PROFILE, CHANGE_PASSWORD, // User management,
    INSTRUCTOR_START_CLASS, CLASS_ATTENDANCE_STATUS, MARKK_ATTENDANCE, FETCH_ATTENDANCE /// Attendance management
    , FETCH_ALL_MISSED_CLASSES, EXCUSE_ABSENCE,
    ATTENDENCE_HISTORY,
    GET_NOTIFICATION,
    READ_NOTIFICATION,
    // Excuse attendance
}