import moment from 'moment';
import moments from 'moment-timezone';

export default function formatDate(dateString) {
  const date = new Date(dateString);

  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const dayOfWeek = daysOfWeek[date.getDay()];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  let daySuffix;
  if (day % 10 === 1 && day !== 11) {
    daySuffix = 'st';
  } else if (day % 10 === 2 && day !== 12) {
    daySuffix = 'nd';
  } else if (day % 10 === 3 && day !== 13) {
    daySuffix = 'rd';
  } else {
    daySuffix = 'th';
  }

  return `${dayOfWeek}, ${day}${daySuffix} ${month} ${year}`;
}

export const formatSchedule = schedule => {
  // const date = new Date(schedule?.date);
  const options = {day: '2-digit', month: '2-digit', year: 'numeric'};
  // const formattedDate = date.toLocaleDateString('en-GB', options);

  const convertTime = time => {
    let [hours, minutes] = time?.split(':');
    let period = 'AM';
    hours = parseInt(hours, 10);
    if (hours >= 12) {
      period = 'PM';
      hours = hours > 12 ? hours - 12 : hours;
    } else if (hours === 0) {
      hours = 12;
    }
    return `${hours}:${minutes} ${period}`;
  };

  const formattedStartTime = schedule?.startTime
    ? convertTime(schedule?.startTime)
    : '';
  const formattedEndTime = schedule?.endTime
    ? convertTime(schedule?.endTime)
    : '';
  const formattedTimeSlot = `${formattedStartTime} to ${formattedEndTime}`;

  return {
    // formattedDate,
    formattedTimeSlot,
  };
};

export const getCurrentDateInFormat = () => {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, '0');
  const day = String(now.getUTCDate()).padStart(2, '0');

  return `${year}-${month}-${day}T00:00:00.000Z`;
};

export const shouldDisableButton = data => {
  // Set the current time in CST
  const currentTime = moments().tz('Asia/Kolkata');
  const currentDay = currentTime.format('dddd');

  if (currentDay !== data?.schedule?.day) {
    return true;
  }

  const [startHours, startMinutes] = data.schedule.startTime
    .split(':')
    .map(Number);
  const [endHours, endMinutes] = data.schedule.endTime.split(':').map(Number);

  // Set start and end times also to CST
  const startTime = moments()
    .tz('Asia/Kolkata')
    .set({hour: startHours, minute: startMinutes, second: 0, millisecond: 0});
  const endTime = moments()
    .tz('Asia/Kolkata')
    .set({hour: endHours, minute: endMinutes, second: 0, millisecond: 0});

  return currentTime.isAfter(endTime) || currentTime.isBefore(startTime);
};

export const sortClassesBySemesterAndTime = classes => {
  const now = moments().tz('Asia/Kolkata');
  const currentDate = now;
  const semesterOrder = ['Spring', 'Summer', 'Fall']; // For comparison

  // Get current semester string
  const getCurrentSemester = () => {
    const month = currentDate.month() + 1; // 1-12
    const year = currentDate.year();
    if (month >= 1 && month <= 4) return {semester: 'Spring', year};
    if (month >= 5 && month <= 7) return {semester: 'Summer', year};
    return {semester: 'Fall', year};
  };
  const {semester: currentSem, year: currentYear} = getCurrentSemester();
  const currentSemOrder = semesterOrder.indexOf(currentSem);

  // Helper to extract semester info
  const getSemesterInfo = (semesterStr) => {
    const match = semesterStr?.match(/(Spring|Summer|Fall)\s(\d{4})/);
    if (!match) return { order: -1, year: 0, semester: '', str: semesterStr };
    const semester = match[1];
    const year = parseInt(match[2], 10);
    const order = semesterOrder.indexOf(semester);
    return { order, year, semester, str: semesterStr };
  };

  // Compare function for semester chronology
  const compareSemesterChrono = (a, b) => {
    if (a.year !== b.year) return a.year - b.year;
    return semesterOrder.indexOf(a.semester) - semesterOrder.indexOf(b.semester);
  };

  // Compare function for semester reverse chronology
  const compareSemesterReverse = (a, b) => {
    if (a.year !== b.year) return b.year - a.year;
    return semesterOrder.indexOf(b.semester) - semesterOrder.indexOf(a.semester);
  };

  // Split classes into future/current and past
  const futureAndCurrent = [];
  const past = [];

  classes.forEach(cls => {
    const info = getSemesterInfo(cls.semester);
    if (
      info.year > currentYear ||
      (info.year === currentYear && info.order > currentSemOrder) ||
      (info.year === currentYear && info.order === currentSemOrder)
    ) {
      futureAndCurrent.push(cls);
    } else {
      past.push(cls);
    }
  });

  // Sort future/current semesters in chronological order
  futureAndCurrent.sort((a, b) => {
    const aInfo = getSemesterInfo(a.semester);
    const bInfo = getSemesterInfo(b.semester);
    const cmp = compareSemesterChrono(aInfo, bInfo);
    if (cmp !== 0) return cmp;
    // Within semester, sort by day and time
    const daysOfWeek = [
      'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
    ];
    const aDayIndex = daysOfWeek.indexOf(a?.schedule?.day);
    const bDayIndex = daysOfWeek.indexOf(b?.schedule?.day);
    if (aDayIndex !== bDayIndex) return aDayIndex - bDayIndex;
    const aStart = a.schedule.startTime || '';
    const bStart = b.schedule.startTime || '';
    if (aStart < bStart) return -1;
    if (aStart > bStart) return 1;
    return 0;
  });

  // Sort past semesters in reverse chronological order
  past.sort((a, b) => {
    const aInfo = getSemesterInfo(a.semester);
    const bInfo = getSemesterInfo(b.semester);
    const cmp = compareSemesterReverse(aInfo, bInfo);
    if (cmp !== 0) return cmp;
    // Within semester, sort by day and time
    const daysOfWeek = [
      'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
    ];
    const aDayIndex = daysOfWeek.indexOf(a?.schedule?.day);
    const bDayIndex = daysOfWeek.indexOf(b?.schedule?.day);
    if (aDayIndex !== bDayIndex) return aDayIndex - bDayIndex;
    const aStart = a.schedule.startTime || '';
    const bStart = b.schedule.startTime || '';
    if (aStart < bStart) return -1;
    if (aStart > bStart) return 1;
    return 0;
  });

  // Concatenate: current/future first, then past
  return [...futureAndCurrent, ...past];
};

export const checkAttendanceStatus = (classItem, userType, userId) => {
  if (userType === 'STUDENT') {
    if (classItem?.message == 'Attendance code not generated yet!') {
      return {
        showButtonDisabled: false,
        message: 'Attendance code not generated yet!',
      };
    } else if (userId && classItem?.data?.presentStudents) {
      {
        let chekUser = classItem?.data?.presentStudents.find(
          item => item?.studentDetails?._id == userId,
        );

        if (chekUser) {
          return {
            showButtonDisabled: true,
            message: 'You have already marked your attendance!',
          };
        }
        if (
          classItem?.data?.codeAttemptsBy?.length >=
          classItem?.data?.codeAttempts
        ) {
          {
            return {
              showButtonDisabled: true,
              message: 'Attendance code expired!',
            };
          }
        } else {
          return {
            showButtonDisabled: false,
            message: null,
          };
        }
      }
    } else {
      return {
        showButtonDisabled: true,
        message: 'Attendance code not generated yet!',
      };
    }
  } else {
    return {
      showButtonDisabled: false,
      message: null,
    };
  }
};

export const filterAndSortClassesByDate = classData => {
  const today = moments().tz('Asia/Kolkata').startOf('day');

  return classData
    .filter(item => {
      const expiresAt = moment(item.attendanceExpiresAt);
      return expiresAt.isSame(today, 'day');
    })
    .sort((a, b) => {
      return moments
        .tz(b.attendanceExpiresAt, 'Asia/Kolkata')
        .diff(moments.tz(a.attendanceExpiresAt, 'Asia/Kolkata'));
    });
};

export const sortClassesByDate = classData => {
  return classData.sort((a, b) => {
    return moments
      .tz(b.attendanceExpiresAt, 'Asia/Kolkata')
      .diff(moments.tz(a.attendanceExpiresAt, 'Asia/Kolkata'));
  });
};

export const filterAndSortClassesBySpecificDate = (classData, targetDate) => {
  const target = moment(targetDate).startOf('day');

  const filtered = classData.filter(item => {
    const expiresAt = moment(item.attendanceExpiresAt);
    return expiresAt.isSame(target, 'day');
  });

  if (filtered.length === 0) {
    return []; // Return an empty array if no items match the date
  }

  return filtered.sort((a, b) => {
    return moment(b.attendanceExpiresAt).diff(moment(a.attendanceExpiresAt));
  });
};

export const getFormattedDate = date => {
  const formattedDate = moment(date).format('YYYY/MM/DD');
  return formattedDate;
};
