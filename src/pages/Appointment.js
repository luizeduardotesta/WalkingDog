import React, { useState } from 'react';
import { format, startOfWeek, addDays, isSameMonth, isSameDay } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';
import { userLogoutAction } from '../redux/actions/userAction';

function Calendar({ selectedDate, onDateClick, appointments, onEventClick }) {
    const currentDate = new Date();
    const monthStart = startOfWeek(currentDate, { weekStartsOn: 0 }); // Start the week on Sunday (0).
    const [currentMonth, setCurrentMonth] = useState(currentDate);
    const isAuthenticated = useSelector(state => state.signIn.isAuthenticated);
    const userInfo = useSelector(state => state.signIn.userInfo);

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

    const renderCells = () => {
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
        // Filter appointments for the given day
        const appointmentsForDay = appointments.filter((appointment) => {
            // Assuming your appointment has a 'date' property
            return isSameDay(appointment.date, day);
        });

        if (appointmentsForDay.length === 0) {
            return <p>No appointments for this day.</p>;
        }

        const handleEditAppointment = (appointment) => {
            // Implement the logic to edit the appointment here
            console.log('Edit appointment:', appointment);
        };

        const handleDeleteAppointment = (appointmentId) => {
            // Implement the logic to delete the appointment here
            console.log('Delete appointment with ID:', appointmentId);
        };

        return (
            <div className="calendar-appointments">
                <h3>Appointments for {format(day, 'MMMM d, yyyy')}</h3>
                <ul>
                    {appointmentsForDay.map((appointment) => (
                        <li key={appointment.id}>
                            <span>{format(appointment.date, 'hh:mm a')}</span>
                            <span>{appointment.title}</span>
                            {isAuthenticated || userInfo.tipo === 'admin' ? (
                                <>
                                    <button onClick={() => handleEditAppointment(appointment)}>Edit</button>
                                    <button onClick={() => handleDeleteAppointment(appointment.id)}>Delete</button>
                                </>
                            ) : null}
                        </li>
                    ))}
                </ul>
            </div>
        );
    };
}

export default Calendar;
