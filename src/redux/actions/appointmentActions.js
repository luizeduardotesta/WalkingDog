import axios from 'axios';
import { toast } from 'react-toastify';
import * as appointmentConstants from '../constants/appointmentConstant';

const {
    APPOINTMENT_CREATE_REQUEST,
    APPOINTMENT_CREATE_SUCCESS,
    APPOINTMENT_CREATE_FAIL,
    APPOINTMENT_SHOW_REQUEST,
    APPOINTMENT_SHOW_SUCCESS,
    APPOINTMENT_SHOW_FAIL,
    APPOINTMENT_SHOWSINGLE_REQUEST,
    APPOINTMENT_SHOWSINGLE_SUCCESS,
    APPOINTMENT_SHOWSINGLE_FAIL,
    APPOINTMENT_DELETE_REQUEST,
    APPOINTMENT_DELETE_SUCCESS,
    APPOINTMENT_DELETE_FAIL,
    APPOINTMENT_UPDATE_REQUEST,
    APPOINTMENT_UPDATE_SUCCESS,
    APPOINTMENT_UPDATE_FAIL,
} = appointmentConstants;

export const createAppointmentAction = (date) => async (dispatch) => {
    dispatch({ type: APPOINTMENT_CREATE_REQUEST });
    try {
        const { data } = await axios.post('/api/schedule/create', { date });
        dispatch({
            type: APPOINTMENT_CREATE_SUCCESS,
            payload: data.appointment,
        });
        toast.success('Appointment created successfully!');
    } catch (error) {
        dispatch({
            type: APPOINTMENT_CREATE_FAIL,
            payload: error.response.data.error,
        });
        toast.error(error.response.data.error);
    }
};

export const showAppointmentsAction = () => async (dispatch) => {
    dispatch({ type: APPOINTMENT_SHOW_REQUEST });
    try {
        const { data } = await axios.get('/api/appointments/show');
        dispatch({
            type: APPOINTMENT_SHOW_SUCCESS,
            payload: data,
        });
        toast.success('Appointments loaded successfully!');
    } catch (error) {
        dispatch({
            type: APPOINTMENT_SHOW_FAIL,
            payload: error.response.data.error,
        });
        toast.error(error.response.data.error);
    }
};

export const showSingleAppointmentAction = (id) => async (dispatch) => {
    dispatch({ type: APPOINTMENT_SHOWSINGLE_REQUEST });
    try {
        const { data } = await axios.get(`/api/appointments/${id}`);
        dispatch({
            type: APPOINTMENT_SHOWSINGLE_SUCCESS,
            payload: data,
        });
        toast.success('Appointment loaded successfully!');
    } catch (error) {
        dispatch({
            type: APPOINTMENT_SHOWSINGLE_FAIL,
            payload: error.response.data.error,
        });
        toast.error(error.response.data.error);
    }
};

export const deleteAppointmentAction = (id) => async (dispatch) => {
    dispatch({ type: APPOINTMENT_DELETE_REQUEST });
    try {
        await axios.delete(`/api/delete/appointments/${id}`);
        dispatch({
            type: APPOINTMENT_DELETE_SUCCESS,
            payload: id,
        });
        toast.success('Appointment deleted successfully!');
    } catch (error) {
        dispatch({
            type: APPOINTMENT_DELETE_FAIL,
            payload: error.response.data.error,
        });
        toast.error(error.response.data.error);
    }
};

export const updateAppointmentAction = (id, date) => async (dispatch) => {
    dispatch({ type: APPOINTMENT_UPDATE_REQUEST });
    try {
        const { data } = await axios.put(`/api/update/appointments/${id}`, { date });
        dispatch({
            type: APPOINTMENT_UPDATE_SUCCESS,
            payload: data.appointment,
        });
        toast.success('Appointment updated successfully!');
    } catch (error) {
        dispatch({
            type: APPOINTMENT_UPDATE_FAIL,
            payload: error.response.data.error,
        });
        toast.error(error.response.data.error);
    }
};
