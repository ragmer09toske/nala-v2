
import moment from 'moment';
export function formattingTime(time) {
  let amPM, updatedTime;
  if (!isNaN(time)) {
    if (time <= 11 || time > 23) {
      amPM = "AM";
    } else {
      amPM = "PM";
    }
    if (time < 12) {
      return time + amPM;
    } else {
      if (time > 24) {
        updatedTime = Number(time) - 24;
      } else {
        updatedTime = Number(time) - 12;
        if (updatedTime === 0) {
          updatedTime = 12;
        }
      }
      return updatedTime + amPM;
    }
  }
};


export function checkIn(checkInStart, checkInEnd) {
  let checkIn;
  if (checkInStart === "Flexible") {
    checkIn = "Any Time";
  } else {
    if (checkInEnd === "Flexible") {
      checkIn = "From " + formattingTime(checkInStart);
    } else {
      if (checkInStart != null && checkInEnd != null) {
        checkIn = formattingTime(checkInStart) + " - " + formattingTime(checkInEnd);
      }
    }
  }

  return checkIn;
};

export function checkValue(value, defaultValue) {
  return value !== null ? value : defaultValue;
};

export function generateTimes(startTime, endTime, isToday) {
  let timesLookup = [], start = 0, end = 1410;
  let currentHours, currentMinutesTime, currentMinutes, currentTime;
  let today = moment();

  let value = 0, label = '';
  start = (startTime) ? Number(startTime) : start;
  end = (endTime) ? Number(endTime) : end;

  // For next day 
  if (startTime >= endTime) {
    end = 1410
  };

  for (let i = start; i <= end; i = i + 30) {
    let hours = Math.floor(Number(i) / 60);
    let minutesTime = Number(i) % 60;
    let minutes = (minutesTime && minutesTime == 30) ? 0.5 : 0;
    value = Number(hours + minutes);

    if (value == 0) {
      label = '12.00' + 'AM';
    } else if (value == 0.5) {
      label = '12.30' + 'AM';
    } else if (value >= 12 && value != 24) {
      label = (hours > 12 && hours < 22) ? '' : '';
      label = label + ((hours > 12) ? hours - 12 : hours);
      label = label + '.' + ((minutesTime == 0) ? '00' : minutesTime) + 'PM';
    } else {
      label = (hours < 10) ? '' : '';
      label = label + hours + '.' + ((minutesTime == 0) ? '00' : minutesTime) + 'AM';
    }

    currentHours = Math.floor(Number(value) / 1);
    currentMinutesTime = Number(value) % 1;
    currentMinutes = (currentMinutesTime && currentMinutesTime == 0.5) ? 30 : 0;
    currentTime = moment({ h: currentHours, m: currentMinutes });

    if (isToday && today.isSameOrAfter(currentTime)) {
      // Past Times

    } else if ((!today.isSameOrAfter(currentTime)) && isToday) { //load times from Current time
      timesLookup.push({
        value,
        hours,
        minutes,
        minutesTime,
        label,
        isNextDay: false
      });
    } else {
      timesLookup.push({
        value,
        hours,
        minutes,
        minutesTime,
        label,
        isNextDay: false
      });
    }

  }
  
//For next day
  if (startTime == 0 && endTime == 0) {
    value = 24;
    label = '11.59 PM'
    timesLookup.push({
      value: 24,
      hours: 24,
      minutes: 0,
      minutesTime: 0,
      label: '11.59 PM',
      isNextDay: true
    });
  }

  return timesLookup;
}

export function formatTime(time) {
  let hours = Math.floor(Number(time) / 1);
  let minutesTime = Number(time) % 1;

  let minutes = (minutesTime && minutesTime == 0.5) ? 30 : 0;
  let label;

  if (time == 0) {
    label = '12:00' + ' AM';
  } else if (time == 0.5) {
    label = '12:30' + ' AM';
  }
  else if (time == 24) {
    label = '11:59' + ' PM';
  } else if (time >= 12 && time != 24) {
    label = (hours > 12 && hours < 22) ? '' : '';
    label = label + ((hours > 12) ? hours - 12 : hours);
    label = label + ':' + ((minutes == 0) ? '00' : minutes) + ' PM';
  } else {
    label = (hours < 10) ? '' : '';
    label = label + hours + ':' + ((minutes == 0) ? '00' : minutes) + ' AM';
  }

  return label;
}


export function startTimeData(startTime) {

  let startTimeValue;

  if (startTime == 0) {
    startTimeValue = '00:00:00'
  } else if (startTime == 0.5) {
    startTimeValue = '00:30:00'
  } else if (startTime == 1) {
    startTimeValue = '01:00:00'
  } else if (startTime == 1.5) {
    startTimeValue = '01:30:00'
  } else if (startTime == 2) {
    startTimeValue = '02:00:00'
  } else if (startTime == 2.5) {
    startTimeValue = '02:30:00'
  } else if (startTime == 3) {
    startTimeValue = '03:00:00'
  } else if (startTime == 3.5) {
    startTimeValue = '03:30:00'
  } else if (startTime == 4) {
    startTimeValue = '04:00:00'
  } else if (startTime == 4.5) {
    startTimeValue = '04:30:00'
  } else if (startTime == 5) {
    startTimeValue = '05:00:00'
  } else if (startTime == 5.5) {
    startTimeValue = '05:30:00'
  } else if (startTime == 6) {
    startTimeValue = '06:00:00'
  } else if (startTime == 6.5) {
    startTimeValue = '06:30:00'
  } else if (startTime == 7) {
    startTimeValue = '07:00:00'
  } else if (startTime == 7.5) {
    startTimeValue = '07:30:00'
  } else if (startTime == 8) {
    startTimeValue = '08:00:00'
  } else if (startTime == 8.5) {
    startTimeValue = '08:30:00'
  } else if (startTime == 9) {
    startTimeValue = '09:00:00'
  } else if (startTime == 9.5) {
    startTimeValue = '09:30:00'
  } else if (startTime == 10) {
    startTimeValue = '10:00:00'
  } else if (startTime == 10.5) {
    startTimeValue = '10:30:00'
  } else if (startTime == 11) {
    startTimeValue = '11:00:00'
  } else if (startTime == 11.5) {
    startTimeValue = '11:30:00'
  } else if (startTime == 12) {
    startTimeValue = '12:00:00'
  } else if (startTime == 12.5) {
    startTimeValue = '12:30:00'
  } else if (startTime == 13) {
    startTimeValue = '13:00:00'
  } else if (startTime == 13.5) {
    startTimeValue = '13:30:00'
  } else if (startTime == 14) {
    startTimeValue = '14:00:00'
  } else if (startTime == 14.5) {
    startTimeValue = '14:30:00'
  } else if (startTime == 15) {
    startTimeValue = '15:00:00'
  } else if (startTime == 15.5) {
    startTimeValue = '15:30:00'
  } else if (startTime == 16) {
    startTimeValue = '16:00:00'
  } else if (startTime == 16.5) {
    startTimeValue = '16:30:00'
  } else if (startTime == 17) {
    startTimeValue = '17:00:00'
  } else if (startTime == 17.5) {
    startTimeValue = '17:30:00'
  } else if (startTime == 18) {
    startTimeValue = '18:00:00'
  } else if (startTime == 18.5) {
    startTimeValue = '18:30:00'
  } else if (startTime == 19) {
    startTimeValue = '19:00:00'
  } else if (startTime == 19.5) {
    startTimeValue = '19:30:00'
  } else if (startTime == 20) {
    startTimeValue = '20:00:00'
  } else if (startTime == 20.5) {
    startTimeValue = '20:30:00'
  } else if (startTime == 21) {
    startTimeValue = '21:00:00'
  } else if (startTime == 21.5) {
    startTimeValue = '21:30:00'
  } else if (startTime == 22) {
    startTimeValue = '22:00:00'
  } else if (startTime == 22.5) {
    startTimeValue = '22:30:00'
  } else if (startTime == 23) {
    startTimeValue = '23:00:00'
  } else if (startTime == 23.5) {
    startTimeValue = '23:30:00'
  } else if (startTime == 24) {
    startTimeValue = '23:59:00'
  }

  return startTimeValue;
}

export function endTimeData(startTime) {

  let endTimeValue;

  if (startTime == 0) {
    endTimeValue = '00:00:00'
  } else if (startTime == 0.5) {
    endTimeValue = '00:30:00'
  } else if (startTime == 1) {
    endTimeValue = '01:00:00'
  } else if (startTime == 1.5) {
    endTimeValue = '01:30:00'
  } else if (startTime == 2) {
    endTimeValue = '02:00:00'
  } else if (startTime == 2.5) {
    endTimeValue = '02:30:00'
  } else if (startTime == 3) {
    endTimeValue = '03:00:00'
  } else if (startTime == 3.5) {
    endTimeValue = '03:30:00'
  } else if (startTime == 4) {
    endTimeValue = '04:00:00'
  } else if (startTime == 4.5) {
    endTimeValue = '04:30:00'
  } else if (startTime == 5) {
    endTimeValue = '05:00:00'
  } else if (startTime == 5.5) {
    endTimeValue = '05:30:00'
  } else if (startTime == 6) {
    endTimeValue = '06:00:00'
  } else if (startTime == 6.5) {
    endTimeValue = '06:30:00'
  } else if (startTime == 7) {
    endTimeValue = '07:00:00'
  } else if (startTime == 7.5) {
    endTimeValue = '07:30:00'
  } else if (startTime == 8) {
    endTimeValue = '08:00:00'
  } else if (startTime == 8.5) {
    endTimeValue = '08:30:00'
  } else if (startTime == 9) {
    endTimeValue = '09:00:00'
  } else if (startTime == 9.5) {
    endTimeValue = '09:30:00'
  } else if (startTime == 10) {
    endTimeValue = '10:00:00'
  } else if (startTime == 10.5) {
    endTimeValue = '10:30:00'
  } else if (startTime == 11) {
    endTimeValue = '11:00:00'
  } else if (startTime == 11.5) {
    endTimeValue = '11:30:00'
  } else if (startTime == 12) {
    endTimeValue = '12:00:00'
  } else if (startTime == 12.5) {
    endTimeValue = '12:30:00'
  } else if (startTime == 13) {
    endTimeValue = '13:00:00'
  } else if (startTime == 13.5) {
    endTimeValue = '13:30:00'
  } else if (startTime == 14) {
    endTimeValue = '14:00:00'
  } else if (startTime == 14.5) {
    endTimeValue = '14:30:00'
  } else if (startTime == 15) {
    endTimeValue = '15:00:00'
  } else if (startTime == 15.5) {
    endTimeValue = '15:30:00'
  } else if (startTime == 16) {
    endTimeValue = '16:00:00'
  } else if (startTime == 16.5) {
    endTimeValue = '16:30:00'
  } else if (startTime == 17) {
    endTimeValue = '17:00:00'
  } else if (startTime == 17.5) {
    endTimeValue = '17:30:00'
  } else if (startTime == 18) {
    endTimeValue = '18:00:00'
  } else if (startTime == 18.5) {
    endTimeValue = '18:30:00'
  } else if (startTime == 19) {
    endTimeValue = '19:00:00'
  } else if (startTime == 19.5) {
    endTimeValue = '19:30:00'
  } else if (startTime == 20) {
    endTimeValue = '20:00:00'
  } else if (startTime == 20.5) {
    endTimeValue = '20:30:00'
  } else if (startTime == 21) {
    endTimeValue = '21:00:00'
  } else if (startTime == 21.5) {
    endTimeValue = '21:30:00'
  } else if (startTime == 22) {
    endTimeValue = '22:00:00'
  } else if (startTime == 22.5) {
    endTimeValue = '22:30:00'
  } else if (startTime == 23) {
    endTimeValue = '23:00:00'
  } else if (startTime == 23.5) {
    endTimeValue = '23:30:00'
  } else if (startTime == 24) {
    endTimeValue = '23:59:00'
  }


  return endTimeValue;
}