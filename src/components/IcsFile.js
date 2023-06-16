import React from 'react'
import ICalendarLink from "react-icalendar-link";


function IcsFile() {
    const event = {
        title: "My Title",
        description: "My Description",
        startTime: "2018-10-07T10:30:00+10:00",
        endTime: "2018-10-07T12:00:00+10:00",
        location: "10 Carlotta St, Artarmon NSW 2064, Australia"
    };

    
  const generateIcsFile = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//My Company//EN
BEGIN:VEVENT
UID:${generateUid()}@mycompany.com
DTSTAMP:${formatDate(new Date())}
DTSTART:${formatDate(new Date(event.startTime))}
DTEND:${formatDate(new Date(event.endTime))}
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
END:VEVENT
END:VCALENDAR`;

    const base64Data = btoa(unescape(encodeURIComponent(icsContent)));
    console.log(base64Data);
  };

  const generateUid = () => {
    // Generate a unique ID using any desired algorithm or library
    // This is just a simple example
    return Math.random().toString(36).substr(2, 9);
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}${month}${day}T${hours}${minutes}${seconds}`;
  };


      
    return (
        <div>
            <button onClick={generateIcsFile}>Generate base64 file</button>
        </div>
    )
}

export default IcsFile