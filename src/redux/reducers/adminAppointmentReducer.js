import {
    ADMIN_APPOINTMENT_CREATE_REQUEST,
    ADMIN_APPOINTMENT_CREATE_SUCCESS,
    ADMIN_APPOINTMENT_CREATE_FAIL,
    ADMIN_APPOINTMENT_CREATE_RESET,
    ADMIN_APPOINTMENT_SHOW_REQUEST,
    ADMIN_APPOINTMENT_SHOW_SUCCESS,
    ADMIN_APPOINTMENT_SHOW_FAIL,
    ADMIN_APPOINTMENT_SHOW_RESET,
    ADMIN_APPOINTMENT_SHOWSINGLE_REQUEST,
    ADMIN_APPOINTMENT_SHOWSINGLE_SUCCESS,
    ADMIN_APPOINTMENT_SHOWSINGLE_FAIL,
    ADMIN_APPOINTMENT_SHOWSINGLE_RESET,
    ADMIN_APPOINTMENT_DELETE_REQUEST,
    ADMIN_APPOINTMENT_DELETE_SUCCESS,
    ADMIN_APPOINTMENT_DELETE_FAIL,
    ADMIN_APPOINTMENT_DELETE_RESET,
    ADMIN_APPOINTMENT_UPDATE_REQUEST,
    ADMIN_APPOINTMENT_UPDATE_SUCCESS,
    ADMIN_APPOINTMENT_UPDATE_FAIL,
    ADMIN_APPOINTMENT_UPDATE_RESET,
} from '../constants/appointmentConstant';

export const adminAppointmentReducerCreate = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_APPOINTMENT_CREATE_REQUEST:
            return { loading: true, appointment: null, success: false, error: null };
        case ADMIN_APPOINTMENT_CREATE_SUCCESS:
            return {
                loading: false,
                appointment: action.payload,
                success: true,
            };
        case ADMIN_APPOINTMENT_CREATE_FAIL:
            return { loading: false, appointment: null, success: false, error: action.payload };
        case ADMIN_APPOINTMENT_CREATE_RESET:
            return {};
        default:
            return state;
    }
}

export const adminAppointmentReducerShow = (state = { appointments: [] }, action) => {
    switch (action.type) {
        case ADMIN_APPOINTMENT_SHOW_REQUEST:
            return { ...state, loading: true };
        case ADMIN_APPOINTMENT_SHOW_SUCCESS:
            return {
                ...state,
                loading: false,
                appointments: action.payload,
            };
        case ADMIN_APPOINTMENT_SHOW_FAIL:
            return { ...state, loading: false, error: action.payload };
        case ADMIN_APPOINTMENT_SHOW_RESET:
            return { appointments: [] };
        default:
            return state;
    }
}

export const adminAppointmentReducerShowSingle = (state = { appointment: null }, action) => {
    switch (action.type) {
        case ADMIN_APPOINTMENT_SHOWSINGLE_REQUEST:
            return { loading: true, appointment: null, error: null };
        case ADMIN_APPOINTMENT_SHOWSINGLE_SUCCESS:
            return {
                loading: false,
                appointment: action.payload,
            };
        case ADMIN_APPOINTMENT_SHOWSINGLE_FAIL:
            return { loading: false, appointment: null, error: action.payload };
        case ADMIN_APPOINTMENT_SHOWSINGLE_RESET:
            return { appointment: null };
        default:
            return state;
    }
}

export const adminAppointmentReducerDelete = (state = { success: false }, action) => {
    switch (action.type) {
        case ADMIN_APPOINTMENT_DELETE_REQUEST:
            return { loading: true };
        case ADMIN_APPOINTMENT_DELETE_SUCCESS:
            return {
                loading: false,
                success: true,
            };
        case ADMIN_APPOINTMENT_DELETE_FAIL:
            return { loading: false, error: action.payload };
        case ADMIN_APPOINTMENT_DELETE_RESET:
            return { success: false };
        default:
            return state;
    }
}

export const adminAppointmentReducerUpdate = (state = { appointment: null }, action) => {
    switch (action.type) {
        case ADMIN_APPOINTMENT_UPDATE_REQUEST:
            return { loading: true, appointment: null, error: null };
        case ADMIN_APPOINTMENT_UPDATE_SUCCESS:
            return {
                loading: false,
                appointment: action.payload,
            };
        case ADMIN_APPOINTMENT_UPDATE_FAIL:
            return { loading: false, appointment: null, error: action.payload };
        case ADMIN_APPOINTMENT_UPDATE_RESET:
            return { appointment: null };
        default:
            return state;
    }
};
