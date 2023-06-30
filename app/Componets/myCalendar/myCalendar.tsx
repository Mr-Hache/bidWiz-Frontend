"use client"

import React, {useState, useEffect} from 'react'
import {useAppSelector} from "../../redux/hooks"
import styles from "./myCalendar.module.scss"
import Swal from "sweetalert2";


function MyCalendar() {
    const localUid = useAppSelector((state) => state.userAuth.uid)
    const [userId, setUserId] = useState('');
    const [calendar, setCalendar] = useState<{days: any} | null>(null);


    const fetchUserData = async () => {
        try {
            const response = await fetch(`https://bidwiz-backend-production-db77.up.railway.app/users/user/${localUid}`);
            const data = await response.json();
            setUserId(data._id);
        } catch (error) {
            console.error(error);
        }
    }
    
    const fetchUserCalendar = async () => {
        try {
            const response = await fetch(`https://bidwiz-backend-production-db77.up.railway.app/users/calendar/${userId}`);
            const data = await response.json();
            setCalendar(data.calendar);
        } catch (error) {
            console.error(error);
        }
    }
    

    useEffect(() => {
        fetchUserData(); 
    }, [localUid]);

    useEffect(() => {
        fetchUserCalendar(); 
    }, [userId]);
    


    if (!calendar) {
        return <div>Loading...</div>;
    }
    
        return (
            <table className={styles.table}>
            <thead>
                <tr>
                {Object.keys(calendar.days).map((day) => (
                    <th key={day}>{day}</th>
                ))}
                </tr>
            </thead>
            <tbody>
                {Object.keys(
                calendar.days[Object.keys(calendar.days)[0]].timeSlots
                ).map((timeSlot) => (
                <tr key={timeSlot}>
                    {Object.keys(calendar.days).map((day) => (
                    <td
                    key={day}
                    className={
                      calendar.days[day].timeSlots[timeSlot]?.isBooked
                        ? styles.reserved
                        : styles.available
                    }
                    onClick={() => {
                      if (calendar.days[day].timeSlots[timeSlot]?.isBooked) {
                        Swal.fire(calendar.days[day].timeSlots[timeSlot]?.detailClass);
                      }
                    }}
                  >
                    {timeSlot}:{" "}
                    {calendar.days[day].timeSlots[timeSlot]?.isBooked
                      ? "Reserved"
                      : "Available"}
                  </td>
                  
                    ))}
                </tr>
                ))}
            </tbody>
            </table>
        );
    }
    
    export default MyCalendar;
