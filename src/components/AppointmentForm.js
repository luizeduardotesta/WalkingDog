import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import axios from 'axios'; // Import axios for making API requests
import 'react-datepicker/dist/react-datepicker.css';

function AppointmentForm() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [appointments, setAppointments] = useState([]); // State to store appointments
    const [editAppointment, setEditAppointment] = useState(null); // State to store the appointment being edited
    const userInfo = useSelector((state) => state.signIn.userInfo);

    // Function to handle date selection
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    // Function to fetch appointments
    const fetchAppointments = async () => {
        try {
            const response = await axios.get('/api/appointments/show');
            setAppointments(response.data);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []); // Fetch appointments on component mount

    // Function to handle form submission for both create and edit
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted');

        if (!selectedDate || selectedDate < new Date()) {
            alert('Please select a valid date and time.');
            return;
        }

        if (editAppointment) {
            // Edit appointment logic
            const updatedAppointment = {
                ...editAppointment,
                date: selectedDate,
            };

            try {
                const response = await axios.put(`/api/update/appointments/${editAppointment._id}`, updatedAppointment);

                if (response.data.success) {
                    alert('Appointment updated successfully!');
                    setEditAppointment(null);
                    fetchAppointments(); // Refresh the list of appointments
                } else {
                    alert('Appointment update failed. Please try again.');
                }
            } catch (error) {
                console.error('Error updating appointment:', error);
                alert('Appointment update failed. Please try again.');
            }
        } else {
            // Create appointment logic
            const appointmentData = {
                date: selectedDate,
                userId: userInfo._id,
            };

            try {
                const response = await axios.post('/api/schedule/create', appointmentData);

                if (response.data.success) {
                    alert('Appointment created successfully!');
                    fetchAppointments(); // Refresh the list of appointments
                } else {
                    alert('Appointment creation failed. Please try again.');
                }
            } catch (error) {
                console.error('Error creating appointment:', error);
                alert('Appointment creation failed. Please try again.');
            }
        }

        // Clear the form after submission
        setSelectedDate(null);
    };

    // Function to set the appointment to be edited
    const handleEditAppointment = (appointment) => {
        setEditAppointment(appointment);
        setSelectedDate(new Date(appointment.date));
    };

    // Function to handle appointment deletion
    const handleDeleteAppointment = async (appointmentId) => {
        if (window.confirm('Are you sure you want to delete this appointment?')) {
            try {
                const response = await axios.delete(`/api/delete/appointments/${appointmentId}`);

                if (response.data.success) {
                    alert('Appointment deleted successfully!');
                    fetchAppointments(); // Refresh the list of appointments
                } else {
                    alert('Appointment deletion failed. Please try again.');
                }
            } catch (error) {
                console.error('Error deleting appointment:', error);
                alert('Appointment deletion failed. Please try again.');
            }
        }
    };

    return (
        <div>
            <h2>{editAppointment ? 'Edit Appointment' : 'Create Appointment'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Appointment for {userInfo.nome}:</label>
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        minDate={new Date()} // Disable past dates
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="MMMM d, yyyy h:mm aa"
                    />
                </div>
                <button type="submit">{editAppointment ? 'Update Appointment' : 'Create Appointment'}</button>
            </form>

            {/* Display the list of appointments */}
            <h2>Appointments</h2>
            <ul>
                {appointments.map((appointment) => (
                    <li key={appointment._id}>
                        {new Date(appointment.date).toLocaleString()}{' '}
                        {appointment.userId.nome}, {appointment.userId.telefone}, {appointment.userId.cidade}, {appointment.userId.rua}{' '}
                        {userInfo.tipo === 'admin' && (
                            <>
                                <button onClick={() => handleEditAppointment(appointment)}>Edit</button>
                                <button onClick={() => handleDeleteAppointment(appointment._id)}>Delete</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AppointmentForm;
