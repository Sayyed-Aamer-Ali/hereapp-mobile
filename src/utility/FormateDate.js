import moment from "moment";
import moments from 'moment-timezone';

export default function formatDate(dateString) {
  const date = new Date(dateString);

  const daysOfWeek = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ];
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
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



export const formatSchedule = (schedule) => {
  
  // const date = new Date(schedule?.date);
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  // const formattedDate = date.toLocaleDateString('en-GB', options);

  const convertTime = (time) => {
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

  const formattedStartTime = schedule?.startTime ? convertTime(schedule?.startTime) : '';
  const formattedEndTime = schedule?.endTime ? convertTime(schedule?.endTime) : '';
  const formattedTimeSlot = `${formattedStartTime} to ${formattedEndTime}`;

  return { 
    // formattedDate, 
    formattedTimeSlot };
};



export const getCurrentDateInFormat = () => {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, '0');
  const day = String(now.getUTCDate()).padStart(2, '0');

  return `${year}-${month}-${day}T00:00:00.000Z`;
};




export const shouldDisableButton = (data) => {
  // Set the current time in CST
  const currentTime = moments().tz('America/Chicago');
  const currentDay = currentTime.format('dddd');

  if (currentDay !== data?.schedule?.day) {
   
    return true; 
  }

  const [startHours, startMinutes] = data.schedule.startTime.split(':').map(Number);
  const [endHours, endMinutes] = data.schedule.endTime.split(':').map(Number);

  // Set start and end times also to CST
  const startTime = moments().tz('America/Chicago').set({ hour: startHours, minute: startMinutes, second: 0, millisecond: 0 });
  const endTime = moments().tz('America/Chicago').set({ hour: endHours, minute: endMinutes, second: 0, millisecond: 0 });

  console.log('Current Time:', currentTime.format('HH:mm, a'));
  console.log('Start Time:', startTime.format('HH:mm, a'));
  console.log('End Time:', endTime.format('HH:mm, a'));
  console.log('Current Time is After End Time:', currentTime.isAfter(endTime));
  console.log('Current Time is Before Start Time:', currentTime.isBefore(startTime));

  return (currentTime.isAfter(endTime) || currentTime.isBefore(startTime));
};





export const sortClassesByDayAndTime = (classes) => {
  const now = moments().tz('America/Chicago'); // Use CST time
  const currentDay = now.format('dddd'); 

  return classes.sort((a, b) => {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const aDayIndex = daysOfWeek.indexOf(a?.schedule?.day);
    const bDayIndex = daysOfWeek.indexOf(b?.schedule?.day);

    const aStartTime = moments.tz(`${a.schedule.startTime}`, "HH:mm", 'America/Chicago');
    const aEndTime = moments.tz(`${a.schedule.endTime}`, "HH:mm", 'America/Chicago');
    const bStartTime = moments.tz(`${b.schedule.startTime}`, "HH:mm", 'America/Chicago');
    const bEndTime = moments.tz(`${b.schedule.endTime}`, "HH:mm", 'America/Chicago');

    const isACurrentlyRunning = a?.schedule?.day === currentDay && now.isBetween(aStartTime, aEndTime);
    const isBCurrentlyRunning = b?.schedule?.day === currentDay && now.isBetween(bStartTime, bEndTime);

    if (isACurrentlyRunning && !isBCurrentlyRunning) return -1;
    if (!isACurrentlyRunning && isBCurrentlyRunning) return 1;

    if (isACurrentlyRunning && isBCurrentlyRunning) {
      return aStartTime.isAfter(bStartTime) ? 1 : -1;
    }

    if (a?.schedule?.day === currentDay && b?.schedule?.day === currentDay) {
      return aStartTime.isAfter(bStartTime) ? 1 : -1;
    }
    if (a?.schedule?.day === currentDay) return -1;
    if (b?.schedule?.day === currentDay) return 1;
    if (aDayIndex !== bDayIndex) {
      return aDayIndex - bDayIndex;
    }
    return aStartTime.isAfter(bStartTime) ? 1 : -1;
  });
};



export const checkAttendanceStatus =  (classItem, userType,userId,) => {
  
  
  if(userType === 'STUDENT'  ){

    if(classItem?.message=="Attendance code not generated yet!")
      {
        
    return true;
      }
    else if(userId && classItem?.data?.presentStudents){
      {
           
          let chekUser=classItem?.data?.presentStudents.find((item)=>item.studentDetails==userId)
       
          if(chekUser)
          {

        
            return true;
          }
          if(classItem?.data?.codeAttemptsBy?.length >= classItem?.data?.codeAttempts){
            return true
          }
          else{
           
            return false;
          }
      }
  
  }
 
  
  else{

    return false;

  }

}
}



export const filterAndSortClassesByDate=(classData)=> {
  const today =  moments().tz('America/Chicago').startOf('day');

  return classData.filter(item => {
      const expiresAt = moments.tz(item.attendanceExpiresAt,'America/Chicago');
      return expiresAt.isSame(today, 'day');
  }).sort((a, b) => {
      return moments.tz(b.attendanceExpiresAt,'America/Chicago').diff(moments.tz(a.attendanceExpiresAt,'America/Chicago'));
  });
}

export const  filterAndSortClassesBySpecificDate=(classData, targetDate)=> {
  const target =moments.tz(targetDate,'America/Chicago').startOf('day');

  const filtered = classData.filter(item => {
      const expiresAt = moments.tz(item.attendanceExpiresAt,'America/Chicago');
      return expiresAt.isSame(target, 'day');
  });

  if (filtered.length === 0) {
      return []; // Return an empty array if no items match the date
  }

  return filtered.sort((a, b) => {
      return moments.tz(b.attendanceExpiresAt,'America/Chicago').diff(moments.tz(a.attendanceExpiresAt,'America/Chicago'));
  });
}