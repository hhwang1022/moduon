import './Footer_8090.css';
import React, { useState, useEffect } from 'react';

const Footer_8090 = () => {
  const [year, setyear] = useState(0);
  const [month, setmonth] = useState(0);
  const [day, setday] = useState(0);
  const [minutes, setminutes] = useState(0);
  const [seconds, setseconds] = useState(0);
  const [ampm, setampms] = useState("AM");
  const [displayHours, setdisplayHours] = useState(0);

  useEffect(() => {
    let timer = setInterval(() => {
      let now = new Date();
      setyear(now.getFullYear());
      setmonth((now.getMonth() + 1).toString().padStart(2, '0'));
      setday(now.getDate().toString().padStart(2, '0'));
      let hours = now.getHours();
      setminutes(now.getMinutes().toString().padStart(2, '0'));
      setseconds(now.getSeconds().toString().padStart(2, '0'));

      setampms('AM');
      setdisplayHours(hours);

      if (hours >= 12) {
        setampms('PM');
        setdisplayHours(hours % 12);
        if (displayHours === 0) {
          setdisplayHours(12);
        }
      }
    }, 1000);

    return () => clearInterval(timer)
  }, [seconds]);


  return (<div className='footer8090background'>
    <div className='footer8090today'>YEAR</div>
    <div className='footer8090todayline' />
    <div className='footer8090today'>{year}</div>
    <div className='footer8090todayline' />
    <div className='footer8090today'>MONTH</div>
    <div className='footer8090todayline' />
    <div className='footer8090today'>{month}</div>
    <div className='footer8090todayline' />
    <div className='footer8090today'>DAY</div>
    <div className='footer8090todayline' />
    <div className='footer8090today'>{day}</div>
    <div className='footer8090todayline' />
    <div className='footer8090today'>{ampm}</div>
    <div className='footer8090todayline' />
    <div className='footer8090today'>{displayHours}h</div>
    <div className='footer8090todayline' />
    <div className='footer8090today'>{minutes}m</div>
    <div className='footer8090todayline' />
    <div className='footer8090today'>{seconds}s</div>
  </div>);
};

export default Footer_8090;
