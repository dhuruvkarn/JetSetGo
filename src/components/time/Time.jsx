import React, { useState } from 'react';
import "./Time.css";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Time = ({departStr,onSelected}) => {
    const [departTime, setDepartTime] = useState(departStr);
    const [showCalendra, setshowCalendra] = useState(false);
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthsOfYear = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const roundTripDate = new Date();
    roundTripDate.setDate(roundTripDate.getDate() + 2);
    const [dateValue , setDateValue] = useState("")


    const handleDate = (value) => {
        var date = value.getDate(); 
        var day = value.getDay(); 
        var month = value.getMonth();
        const newDepart = `${date} ${monthsOfYear[month]} ,${daysOfWeek[day]}`
        setDepartTime(newDepart);   
        setDateValue(value);
        setshowCalendra(false);
        if (departStr.toLowerCase().includes("depart")) {
            onSelected(value, "departTime");
        } else {
            onSelected(value, "returnTime");
        }
    }

  return (
      <div className='timeMainContainer' onMouseEnter={()=>setshowCalendra(!showCalendra)}>
        <div className='timeMainContainerDiv'>
           {departTime.split("-").join("")}
          </div>
          <div style={{ width: showCalendra ? '300px' : '0' }}
            className='calendraMainContainer'
            onMouseLeave={() => setshowCalendra(false)}
          >
          {showCalendra && 
                  <Calendar
                  minDate={new Date()}
                  value={dateValue}
                onChange={(value, event) => handleDate(value)}
            />
            }
          </div>
      </div>
  )
}

export default Time;