import axios from "axios";
import {changeIsLogin} from "./visReducer";

const REGISTRATION = 'REGISTRATION';
const SAVE_TOKEN = 'SAVE_TOKEN';
const LOGOUT = 'LOGOUT';
const ERROR = 'ERROR';
const SUCCESS = 'SUCCESS';
const CLEAR = 'CLEAR';
const CREATE_EMPTY_FIELDS_MSG = 'CREATE_EMPTY_FIELDS_MSG';
const DELETE_EMPTY_FIELDS_MSG = 'DELETE_EMPTY_FIELDS_MSG';
const CONFIRM_DATA_FOR_PROPERTY = 'CONFIRM_DATA_FOR_PROPERTY';
const SUCCESS_PROPERTY = 'SUCCESS_PROPERTY';
const CHANGE_LOADING = 'CHANGE_LOADING';
const EMAIL_VERIFICATION = 'EMAIL_VERIFICATION';
const DELETE_EMAIL_VERIFICATION = 'DELETE_EMAIL_VERIFICATION';

const LOGIN = 'LOGIN';
const RESET_PASSWORD = 'RESET_PASSWORD';
const SET_NO_LOGIN_MSG = 'SET_NO_LOGIN_MSG';

const link = process.env.REACT_APP_MAIN_API;


// const {REACT_APP_MAIN_API} = process.env


const initialState = {
    user: null,
    token: null,
    role: 0,
    message: '',
    auth: false,
    resultMessage: '',
    result: null,
    emptyMessage: '',
    confirmDataProperty: '',
    resultMessageProperty: '',
    resultProperty: null,
    loading: false,
    verifyMessage: '',
    noLoginMsg:''

};


// reducer
export default (state = initialState, action) => {
    switch (action.type) {
        case REGISTRATION: {
            console.log(action.payload.user.user.email);
            if(action.payload.user.user.role === 1) localStorage.setItem('ROLE', 'user');
            localStorage.setItem('USER', action.payload.user.user.email);
            return {
                ...state,
                user: action.payload.user,
                message: action.payload.message,
                role: action.payload.user.user.role,
                auth: true,
            }
        }


        // action  - синх - это флаг или сигнал
        case SAVE_TOKEN: {
            localStorage.setItem("ACCESS", JSON.stringify(action.payload.access));
            localStorage.setItem("REFRESH", JSON.stringify(action.payload.refresh));

            return {
                ...state,
                token: action.payload
            }
        }
        case LOGOUT: {
            localStorage.removeItem('token');
            return initialState;

        }
        case ERROR: {
            return {
                ...state,
                resultMessage: action.payload + "!",
                result: 0
            }
        }

        case SUCCESS: {
            return {
                ...state,
                resultMessage: "Спасибо,  что используете Silkway! Для завершения регистрации введите код, отправленный  на указанный вами электронный адрес",
                result: 1

            }
        }
        case CLEAR: {
            return {
                ...state,
                resultMessage: null,
                result: null

            }
        }
        case CREATE_EMPTY_FIELDS_MSG: {
            return {
                ...state,
                emptyMessage: "Please enter your data"
            }
        }
        case DELETE_EMPTY_FIELDS_MSG: {
            return {
                ...state,
                emptyMessage: ""
            }
        }

        case CONFIRM_DATA_FOR_PROPERTY: {
            console.log("in action I catch" + action.payload)
            return {
                ...state,
                confirmDataProperty: action.payload
            }
        }

        case SUCCESS_PROPERTY: {
            return {
                ...state,
                resultProperty: 1,
                resultMessageProperty: 'Сообщение отправлено. Скоро наш менеджер свяжется с Вами!'

            }
        }

        case CHANGE_LOADING: {
            return {
                ...state,
                loading: !state.loading
            }
        }

        case EMAIL_VERIFICATION: {
            return {
                ...state,
                verifyMessage: action.payload
            }
        }

        case DELETE_EMAIL_VERIFICATION: {
            return {
                ...state,
                verifyMessage: '',
                resultMessageProperty: '',
                resultProperty: null
            }
        }

        case LOGIN:{
            localStorage.setItem('USER', action.data.user.authenticatedUser.email);
            localStorage.setItem("ACCESS", JSON.stringify(action.data.user.access));
            localStorage.setItem("REFRESH", JSON.stringify(action.data.user.refresh));
            return {
                ...state,
                user: action.data.user,
                noLoginMsg : ''
            }
        }
        case SET_NO_LOGIN_MSG:{
            return {
                ...state,
                noLoginMsg: 'Пользователь не найден'
            }
        }
        default :
            return state
    }
}

// action creator - асинх
export const signUp = (payload,) => {
    return (dispatch) => {


            // axios.post(`${link}authe/register/`, payload)
            axios.post(` http://silk-travel.herokuapp.com/ru/authe/register/`, payload)
            .then(({data}) => {
                console.log(JSON.stringify(data))
                dispatch({type: REGISTRATION, payload: data});
                dispatch({type: SUCCESS});
                dispatch(getToken(payload));
                dispatch(changeLoading());

            })
            .catch((e) => {
                if (e.message === 'Request failed with status code 400') {
                    console.log("aaa")
                    dispatch({type: ERROR, payload: 'user with this email already exists'})
                    dispatch(changeLoading());


                }
            })
    }
};

export const getToken = (data) => (dispatch) => {
    axios.post(`${link}authe/token/obtain/`, data)
        .then(({data}) => {
            console.log(data);
            dispatch({type: SAVE_TOKEN, payload: data})
        })

};

export const logout = () => ({
    type: LOGOUT
});

export const clearData = () => ({
    type: CLEAR
});

export const sendMsgForEmpty = () => ({
    type: CREATE_EMPTY_FIELDS_MSG
});

export const deleteMsgForEmpty = () => ({
    type: DELETE_EMPTY_FIELDS_MSG
});


export const regConfirmProperty = (data) => (dispatch) => {
    console.log("function 2");

    axios.post(`${link}authe/request-to-register/`, data)
        .then(({data}) => {
            if (data === 'Sent') {
                console.log(data);
                dispatch({type: CONFIRM_DATA_FOR_PROPERTY, payload: data})
                dispatch(changeLoading());
                dispatch({type: SUCCESS_PROPERTY})
            }
        })

};

export const changeLoading = () => ({
    type: CHANGE_LOADING
});


export const confirmEmail = (code) => {
    let access = localStorage.getItem("ACCESS");
    access = access.slice(1, (access.length - 1))
    return (dispatch) => {
        axios.get(`${link}authe/email-verify/${code}/`, {
            headers: {'AUTHORIZATION': `Bearer ${access}`}
        })
            .then(({data}) => {
                console.log(data.user.email);
                if (data.user.email === 'Successfully activated') {
                    dispatch({type: EMAIL_VERIFICATION, payload: "Ваш Email был успешно подтвержден!"})
                }

            })
            .catch((e) => {
                console.log(e.message)

            })
    }
};

export const deleteVerMessage =()=>({
    type: DELETE_EMAIL_VERIFICATION
})

export const login =(data)=>{
    return(dispatch)=>{
        axios.post(`http://silk-travel.herokuapp.com/ru/authe/login/`, data)
            .then(({data})=>{
                console.log(data.user.message)
                dispatch({type:LOGIN, data: data})
                dispatch(changeLoading());

            })
            .catch((e)=>{
                console.log(e.message)
                dispatch(changeLoading());
                dispatch(changeIsLogin());
                dispatch({type: 'SET_NO_LOGIN_MSG'})

            })
    }
};

export const logoutUser =(payload)=>{
    let access = localStorage.getItem("ACCESS");
    access = access.slice(1, (access.length - 1))
    return(dispatch)=>{
        axios.post(`${link}authe/logout/`, payload, {
            headers: {'AUTHORIZATION': `Bearer ${access}`}
        })
            .then(({data})=>{
                console.log(data)


            })
            .catch((e)=>{
                console.log(e.message)
            })
    }

};


export const resetPassword =(email)=>{
    let obj = {
        "email": email
    };
    return(dispatch)=>{
        axios.post(`${link}authe/request-reset-password-by-email/`, obj)
            .then(({data})=>{
                console.log(data)
                // dispatch({type:LOGIN, data: data})
                // dispatch(changeLoading());

            })
            .catch((e)=>{
                console.log(e.message)
                // dispatch(changeLoading());

            })
    }
};






