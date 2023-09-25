import React, { useState, useEffect } from 'react';
import { format, startOfWeek, addDays, isSameMonth, isSameDay } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';
import { showAppointmentsAction, createAppointmentAction } from '../redux/actions/appointmentActions';
import './Appointment.css'

function Calendar() {
    const currentDate = new Date();
    const monthStart = startOfWeek(currentDate, { weekStartsOn: 0 });
    const [currentMonth, setCurrentMonth] = useState(currentDate);
    const isAuthenticated = useSelector(state => state.signIn.isAuthenticated);
    const userInfo = useSelector(state => state.signIn.userInfo);
    const dispatch = useDispatch();
    const [selectedDate, setSelectedDate] = useState(null);

    // Fetch appointments from Redux store when the component mounts
    useEffect(() => {
        dispatch(showAppointmentsAction());
    }, [dispatch]);

    // Access the appointments data from the Redux store
    const appointments = useSelector(state => state.appointments);

    const renderHeader = () => {
        const dateFormat = 'MMMM yyyy';
        return (
            <div className="calendar-header">
                <button onClick={prevMonth}>Previous</button>
                <span>{format(currentMonth, dateFormat)}</span>
                <button onClick={nextMonth}>Next</button>
            </div>
        );
    };

    const prevMonth = () => {
        setCurrentMonth(addDays(monthStart, -7)); // Go back one week
    };

    const nextMonth = () => {
        setCurrentMonth(addDays(monthStart, 7)); // Go forward one week
    };

    const renderDays = () => {
        const dateFormat = 'EEEE';
        const days = [];
        let startDate = monthStart;
        for (let i = 0; i < 7; i++) {
            days.push(
                <div className="calendar-day" key={i}>
                    {format(startDate, dateFormat)}
                </div>
            );
            startDate = addDays(startDate, 1);
        }
        return <div className="calendar-days">{days}</div>;
    };

    const handleDateClick = (day) => {
        // Handle date selection logic here
        setSelectedDate(day);

        // Show an alert for demonstration (you can replace this with a modal or form)
        alert(`You clicked on ${format(day, 'MMMM d, yyyy')}`);
    };

    const renderCells = (onDateClick) => {
        const monthStart = startOfWeek(currentMonth, { weekStartsOn: 0 });
        const dateFormat = 'd';
        const rows = [];
        let days = [];
        let day = monthStart;
        let formattedDate = '';

        for (let i = 0; i < 35; i++) {
            formattedDate = format(day, dateFormat);
            const cloneDay = day;
            days.push(
                <div
                    className={`calendar-cell ${!isSameMonth(day, currentMonth) ? 'disabled' : ''}`}
                    key={day}
                    onClick={() => onDateClick(cloneDay)}
                >
                    <span className={`calendar-date ${isSameDay(day, selectedDate) ? 'selected' : ''}`}>
                        {formattedDate}
                    </span>
                    {renderAppointmentsForDay(cloneDay)}
                </div>
            );
            day = addDays(day, 1);

            if (i === 6 || i === 13 || i === 20 || i === 27) {
                rows.push(
                    <div className="calendar-row" key={day}>
                        {days}
                    </div>
                );
                days = [];
            }
        }
        return <div className="calendar-body">{rows}</div>;
    };

    const renderAppointmentsForDay = (day) => {
        // Check if appointments is defined
        if (!appointments) {
            console.log('Appointments is undefined');
            return null;
        }

        // Filter appointments for the given day
        const appointmentsForDay = appointments.filter((appointment) => {
            // Assuming your appointment has a 'date' property
            return isSameDay(appointment.date, day);
        });

        // Add this console.log statement to check the filtered appointments
        console.log('Appointments for the day:', appointmentsForDay);

        if (appointmentsForDay.length === 0) {
            return <p>No appointments for this day.</p>;
        }

        // Render the appointments here
        return (
            <ul>
                {appointmentsForDay.map((appointment) => (
                    <li key={appointment.id}>
                        {/* Display appointment details */}
                        {appointment.title} at {format(appointment.date, 'hh:mm a')}
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div className="calendar-container">
            {renderHeader()}
            {renderDays()}
            {renderCells(handleDateClick)} {/* Pass handleDateClick to renderCells */}
        </div>
    );
}

export default Calendar;
