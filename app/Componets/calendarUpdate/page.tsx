import React, { useState, useEffect } from 'react';
import styles from "./calendarUpdate.module.scss"

interface CalendarProps {
  calendarData: any; 
  numberClasses: number; 
  onSelectedTimeslots: (timeslots: {day: string, hour: string}[]) => void;
}

const CalendarUpdate: React.FC<CalendarProps> = ({calendarData, numberClasses, onSelectedTimeslots}) => {
    const [selectedTimeslots, setSelectedTimeslots] = useState<
    { day: string; hour: string }[]
  >([]);

  const handleTimeSlotClick = (day: string, timeSlot: string) => {
    const isSelected = isTimeSlotSelected(day, timeSlot);
    if (isSelected) {
      setSelectedTimeslots((currentTimeslots) =>
        currentTimeslots.filter(
          (timeslot) => !(timeslot.day === day && timeslot.hour === timeSlot)
        )
      );
    } else {
      if (selectedTimeslots.length < numberClasses) {
        setSelectedTimeslots((currentTimeslots) => [
          ...currentTimeslots,
          { day, hour: timeSlot },
        ]);
      }
    }
  };

  useEffect(() => {
    onSelectedTimeslots(selectedTimeslots);
  }, [selectedTimeslots]);

  const isTimeSlotSelected = (day: string, timeSlot: string) => {
    return selectedTimeslots.some(timeslot => timeslot.day === day && timeslot.hour === timeSlot && !isTimeslotDeselected(timeslot));
  }

  const isTimeslotDeselected = (timeslot: { day: string; hour: string }) => {
    return selectedTimeslots.some(
      (t) => t.day === timeslot.day && t.hour === timeslot.hour && t !== timeslot
    );
  };
  
  

  return (
    <table>
      <thead>
        <tr>
          {Object.keys(calendarData.days).map(day => (
            <th key={day}>{day}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Object.keys(calendarData.days[Object.keys(calendarData.days)[0]].timeSlots).map(timeSlot => (
          <tr key={timeSlot}>
            {Object.keys(calendarData.days).map(day => (
              <td 
                key={day}
                onClick={() => handleTimeSlotClick(day, timeSlot)}
                style={{
                    cursor: "pointer",
                    backgroundColor: isTimeSlotSelected(day, timeSlot) ? 'blue' : 'white',
                    color: isTimeSlotSelected(day, timeSlot) ? 'white' : 'black',
                }}
              >
                {timeSlot}: {calendarData.days[day].timeSlots[timeSlot]?.isBooked ? 'Reserved' : 'Available'}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default CalendarUpdate;





