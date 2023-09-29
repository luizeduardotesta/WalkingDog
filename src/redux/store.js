import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { userReducerSignUp, userReducerSignIn, userReducerProfile, userReducerLogout, userReducerUpdateUserProfile } from './reducers/userReducer';
import {
    adminAppointmentReducerCreate,
    adminAppointmentReducerShow,
    adminAppointmentReducerShowSingle,
    adminAppointmentReducerDelete,
    adminAppointmentReducerUpdate
} from './reducers/adminAppointmentReducer'
import {
    appointmentReducerCreate,
    appointmentReducerShow,
    appointmentReducerShowSingle,
    appointmentReducerDelete,
    appointmentReducerUpdate
} from './reducers/appointmentReducer'


// combine reducers
const reducer = combineReducers({
    signIn: userReducerSignIn,
    signUp: userReducerSignUp,
    logOut: userReducerLogout,
    userProfile: userReducerProfile,
    updateUserProfile: userReducerUpdateUserProfile,
    adminAppointmentCreate: adminAppointmentReducerCreate,
    adminAppointmentShow: adminAppointmentReducerShow,
    adminAppointmentShowSingle: adminAppointmentReducerShowSingle,
    adminAppointmentDelete: adminAppointmentReducerDelete,
    adminAppointmentUpdate: adminAppointmentReducerUpdate,
    appointmentCreate: appointmentReducerCreate,
    appointmentShow: appointmentReducerShow,
    appointmentShowSingle: appointmentReducerShowSingle,
    appointmentDelete: appointmentReducerDelete,
    appointmentUpdate: appointmentReducerUpdate,
});

// initial state
let initialState = {
    signIn: {
        userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
    },
    appointmentCreate: {
        loading: false,
        appointment: null,
        success: false,
        error: null
    },
    appointmentShow: {
        loading: false,
        appointments: [],
        error: null
    },
    appointmentShowSingle: {
        loading: false,
        appointment: null,
        error: null
    },
    appointmentDelete: {
        loading: false,
        success: false,
        error: null
    },
    appointmentUpdate: {
        loading: false,
        appointment: null,
        error: null
    },
};


const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;