import axios from 'axios';
import { toast } from 'react-toastify';
import * as appointmentConstants from '../constants/adminAppointmentConstant';

const {
    ADMIN_APPOINTMENT_CREATE_REQUEST,
    ADMIN_APPOINTMENT_CREATE_SUCCESS,
    ADMIN_APPOINTMENT_CREATE_FAIL,
    ADMIN_APPOINTMENT_SHOW_REQUEST,
    ADMIN_APPOINTMENT_SHOW_SUCCESS,
    ADMIN_APPOINTMENT_SHOW_FAIL,
    ADMIN_APPOINTMENT_SHOWSINGLE_REQUEST,
    ADMIN_APPOINTMENT_SHOWSINGLE_SUCCESS,
    ADMIN_APPOINTMENT_SHOWSINGLE_FAIL,
    ADMIN_APPOINTMENT_DELETE_REQUEST,
    ADMIN_APPOINTMENT_DELETE_SUCCESS,
    ADMIN_APPOINTMENT_DELETE_FAIL,
    ADMIN_APPOINTMENT_UPDATE_REQUEST,
    ADMIN_APPOINTMENT_UPDATE_SUCCESS,
    ADMIN_APPOINTMENT_UPDATE_FAIL,
} = appointmentConstants;

export const createAppointmentAction = (date) => async (dispatch) => {
    dispatch({ type: ADMIN_APPOINTMENT_CREATE_REQUEST });
    try {
        const { data } = await axios.post('/api/admin/schedule/create', { date });
        dispatch({
            type: ADMIN_APPOINTMENT_CREATE_SUCCESS,
            payload: data.appointment,
        });
        toast.success('Appointment created successfully!');
    } catch (error) {
        dispatch({
            type: ADMIN_APPOINTMENT_CREATE_FAIL,
            payload: error.response.data.error,
        });
        toast.error(error.response.data.error);
    }
};

export const showAppointmentsAction = () => async (dispatch) => {
    dispatch({ type: ADMIN_APPOINTMENT_SHOW_REQUEST });
    try {
        const { data } = await axios.get('/api/admin/appointments/show');
        dispatch({
            type: ADMIN_APPOINTMENT_SHOW_SUCCESS,
            payload: data,
        });
        toast.success('Appointments loaded successfully!');
    } catch (error) {
        dispatch({
            type: ADMIN_APPOINTMENT_SHOW_FAIL,
            payload: error.response.data.error,
        });
        toast.error(error.response.data.error);
    }
};

export const showSingleAppointmentAction = (id) => async (dispatch) => {
    dispatch({ type: ADMIN_APPOINTMENT_SHOWSINGLE_REQUEST });
    try {
        const { data } = await axios.get(`/api/admin/appointments/${id}`);
        dispatch({
            type: ADMIN_APPOINTMENT_SHOWSINGLE_SUCCESS,
            payload: data,
        });
        toast.success('Appointment loaded successfully!');
    } catch (error) {
        dispatch({
            type: ADMIN_APPOINTMENT_SHOWSINGLE_FAIL,
            payload: error.response.data.error,
        });
        toast.error(error.response.data.error);
    }
};

export const deleteAppointmentAction = (id) => async (dispatch) => {
    dispatch({ type: ADMIN_APPOINTMENT_DELETE_REQUEST });
    try {
        await axios.delete(`/api/admin/delete/appointments/${id}`);
        dispatch({
            type: ADMIN_APPOINTMENT_DELETE_SUCCESS,
            payload: id,
        });
        toast.success('Appointment deleted successfully!');
    } catch (error) {
        dispatch({
            type: ADMIN_APPOINTMENT_DELETE_FAIL,
            payload: error.response.data.error,
        });
        toast.error(error.response.data.error);
    }
};

export const updateAppointmentAction = (id, date) => async (dispatch) => {
    dispatch({ type: ADMIN_APPOINTMENT_UPDATE_REQUEST });
    try {
        const { data } = await axios.put(`/api/admin/update/appointments/${id}`, { date });
        dispatch({
            type: ADMIN_APPOINTMENT_UPDATE_SUCCESS,
            payload: data.appointment,
        });
        toast.success('Appointment updated successfully!');
    } catch (error) {
        dispatch({
            type: ADMIN_APPOINTMENT_UPDATE_FAIL,
            payload: error.response.data.error,
        });
        toast.error(error.response.data.error);
    }
};
