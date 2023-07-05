"use client";

import React, { useState, useEffect } from "react";
import styles from "./calendarUpdate.module.scss";
import { useTheme } from "next-themes";

interface CalendarProps {
  calendarData: any;
  numberClasses: number;
  onSelectedTimeslots: (timeslots: { day: string; hour: string }[]) => void;
}

const CalendarUpdate: React.FC<CalendarProps> = ({
  calendarData,
  numberClasses,
  onSelectedTimeslots,
}) => {
  const [selectedTimeslots, setSelectedTimeslots] = useState<
    { day: string; hour: string }[]
  >([]);
  const { theme } = useTheme();

  const handleTimeSlotClick = (day: string, timeSlot: string) => {
    const isSelected = isTimeSlotSelected(day, timeSlot);

    if (isSelected) {
      setSelectedTimeslots((currentTimeslots) =>
        currentTimeslots.filter(
          (timeslot) => !(timeslot.day === day && timeslot.hour === timeSlot)
        )
      );
    } else {
      // Verificar si el timeslot está reservado
      if (
        !calendarData.days[day].timeSlots[timeSlot].isBooked &&
        selectedTimeslots.length < numberClasses
      ) {
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

  useEffect(() => {
    setSelectedTimeslots([]);
  }, [numberClasses]);

  const isTimeSlotSelected = (day: string, timeSlot: string) => {
    return selectedTimeslots.some(
      (timeslot) =>
        timeslot.day === day &&
        timeslot.hour === timeSlot &&
        !isTimeslotDeselected(timeslot)
    );
  };

  const isTimeslotDeselected = (timeslot: { day: string; hour: string }) => {
    return selectedTimeslots.some(
      (t) =>
        t.day === timeslot.day && t.hour === timeslot.hour && t !== timeslot
    );
  };

  return (
    <table
      className={`${styles.table} ${
        theme === "dark" ? styles.tableDark : styles.tableLight
      }`}
    >
      <thead>
        <tr
          style={
            theme === "dark"
              ? { border: "none" }
              : { backgroundColor: "#a5d6a7" }
          }
        >
          {Object.keys(calendarData.days).map((day) => (
            <th
              style={
                theme === "dark"
                  ? {
                      backgroundColor: "#181123",
                    }
                  : { backgroundColor: "#a5d6a7" }
              }
              key={day}
            >
              {day}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Object.keys(
          calendarData.days[Object.keys(calendarData.days)[0]].timeSlots
        ).map((timeSlot) => (
          <tr key={timeSlot}>
            {Object.keys(calendarData.days).map((day) => (
              <td
                className={`
                ${
                  calendarData.days[day].timeSlots[timeSlot]?.isBooked
                    ? theme === "dark"
                      ? styles.reservedDark
                      : styles.reserved
                    : styles.available
                }
                ${
                  isTimeSlotSelected(day, timeSlot)
                    ? theme === "dark"
                      ? styles.selectedDark
                      : styles.selected
                    : ""
                }
              `}
                key={day}
                onClick={() => handleTimeSlotClick(day, timeSlot)}
                style={{ cursor: "pointer" }}
              >
                {timeSlot}:{" "}
                {calendarData.days[day].timeSlots[timeSlot]?.isBooked
                  ? "Reserved"
                  : "Available"}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CalendarUpdate;
