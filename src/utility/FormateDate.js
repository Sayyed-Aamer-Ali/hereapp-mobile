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
    const date = new Date(schedule?.date);
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-GB', options);
  
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
  
    return { formattedDate, formattedTimeSlot };
  };
  


export const getCurrentDateInFormat = () => {
    const now = new Date();
    const year = now.getUTCFullYear();
    const month = String(now.getUTCMonth() + 1).padStart(2, '0');
    const day = String(now.getUTCDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}T00:00:00.000Z`;
  };



export const shouldDisableButton = (data) => {
    const currentTime = new Date();
    const endTime = new Date(data.date);
    const [endHours, endMinutes] = data.endTime.split(':').map(Number);
    endTime.setHours(endHours, endMinutes);
  
    return currentTime > endTime;
  };