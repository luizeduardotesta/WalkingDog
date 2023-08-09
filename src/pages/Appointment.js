import React, { useState, useEffect } from 'react';

function Appointment() {
    const [appointments, setAppointments] = useState([]);

    const fetchAppointments = async () => {
        try {
            const response = await fetch('/api/appointments/show');
            const data = await response.json();
            setAppointments(data);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    return (
        <div className="App">
            <h1>Appointment Management</h1>
            <button onClick={fetchAppointments}>Fetch Appointments</button>
            <ul>
                {appointments.map(appointment => (
                    <li key={appointment._id}>
                        Name: {appointment.name}, Date: {appointment.date}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Appointment