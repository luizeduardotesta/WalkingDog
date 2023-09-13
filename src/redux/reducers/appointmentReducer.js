import {
    APPOINTMENT_CREATE_REQUEST,
    APPOINTMENT_CREATE_SUCCESS,
    APPOINTMENT_CREATE_FAIL,
    APPOINTMENT_CREATE_RESET,
    APPOINTMENT_SHOW_REQUEST,
    APPOINTMENT_SHOW_SUCCESS,
    APPOINTMENT_SHOW_FAIL,
    APPOINTMENT_SHOW_RESET,
    APPOINTMENT_SHOWSINGLE_REQUEST,
    APPOINTMENT_SHOWSINGLE_SUCCESS,
    APPOINTMENT_SHOWSINGLE_FAIL,
    APPOINTMENT_SHOWSINGLE_RESET,
    APPOINTMENT_DELETE_REQUEST,
    APPOINTMENT_DELETE_SUCCESS,
    APPOINTMENT_DELETE_FAIL,
    APPOINTMENT_DELETE_RESET,
    APPOINTMENT_UPDATE_REQUEST,
    APPOINTMENT_UPDATE_SUCCESS,
    APPOINTMENT_UPDATE_FAIL,
    APPOINTMENT_UPDATE_RESET
} from '../constants/appointmentConstant';

export const appointmentReducerCreate = (state = {}, action) => {
    switch (action.type) {
        case APPOINTMENT_CREATE_REQUEST:
            return { loading: true, appointment: null, success: false, error: null };
        case APPOINTMENT_CREATE_SUCCESS:
            return {
                loading: false,
                appointment: action.payload,
                success: true,
            };
        case APPOINTMENT_CREATE_FAIL:
            return { loading: false, appointment: null, success: false, error: action.payload };
        case APPOINTMENT_CREATE_RESET:
            return {};
        default:
            return state;
    }
}

export const appointmentReducerShow = (state = { appointments: [] }, action) => {
    switch (action.type) {
        case APPOINTMENT_SHOW_REQUEST:
            return { ...state, loading: true };
        case APPOINTMENT_SHOW_SUCCESS:
            return {
                ...state,
                loading: false,
                appointments: action.payload,
            };
        case APPOINTMENT_SHOW_FAIL:
            return { ...state, loading: false, error: action.payload };
        case APPOINTMENT_SHOW_RESET:
            return { appointments: [] };
        default:
            return state;
    }
}

export const appointmentReducerShowSingle = (state = { appointment: null }, action) => {
    switch (action.type) {
        case APPOINTMENT_SHOWSINGLE_REQUEST:
            return { loading: true, appointment: null, error: null };
        case APPOINTMENT_SHOWSINGLE_SUCCESS:
            return {
                loading: false,
                appointment: action.payload,
            };
        case APPOINTMENT_SHOWSINGLE_FAIL:
            return { loading: false, appointment: null, error: action.payload };
        case APPOINTMENT_SHOWSINGLE_RESET:
            return { appointment: null };
        default:
            return state;
    }
}

export const appointmentReducerDelete = (state = { success: false }, action) => {
    switch (action.type) {
        case APPOINTMENT_DELETE_REQUEST:
            return { loading: true };
        case APPOINTMENT_DELETE_SUCCESS:
            return {
                loading: false,
                success: true,
            };
        case APPOINTMENT_DELETE_FAIL:
            return { loading: false, error: action.payload };
        case APPOINTMENT_DELETE_RESET:
            return { success: false };
        default:
            return state;
    }
}

export const appointmentReducerUpdate = (state = { appointment: null }, action) => {
    switch (action.type) {
        case APPOINTMENT_UPDATE_REQUEST:
            return { loading: true, appointment: null, error: null };
        case APPOINTMENT_UPDATE_SUCCESS:
            return {
                loading: false,
                appointment: action.payload,
            };
        case APPOINTMENT_UPDATE_FAIL:
            return { loading: false, appointment: null, error: action.payload };
        case APPOINTMENT_UPDATE_RESET:
            return { appointment: null };
        default:
            return state;
    }
};
