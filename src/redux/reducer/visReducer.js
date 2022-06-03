import axios from "axios";

const GET_DATA = 'GET_DATA';
const SHOW_LOGIN_DIV = 'SHOW_LOGIN_DIV';
const SHOW_RESPASS_DIV = 'SHOW_RESPASS_DIV';
const FALSE_RESPASS_DIV = 'FALSE_RESPASS_DIV';
const CHANGE_LOGIN_DIV = 'CHANGE_LOGIN_DIV';
const SET_FALSE_LOGIN = 'SET_FALSE_LOGIN';
const SHOW_SMALL_MENU = 'SHOW_SMALL_MENU';
const SET_SMALL_MENU_STATUS = 'SET_SMALL_MENU_STATUS';
const CHANGE_FILTER_STATUS = 'CHANGE_FILTER_STATUS';

const SHOW_PEOPLE_DIV = 'SHOW_PEOPLE_DIV';
const CHANGE_PEOPLE_DIV = 'CHANGE_PEOPLE_DIV';

const SHOW_CONTACT_DIV = 'SHOW_CONTACT_DIV';
const CHANGE_CONTACT_DIV = 'CHANGE_CONTACT_DIV';

const ADD_ROOM = "ADD_ROOM";
const ADD_FIRST_ROOM = "ADD_FIRST_ROOM";
const REMOVE_ROOM = "REMOVE_ROOM";
const SET_LOADING_TRUE = "SET_LOADING_TRUE";
const SET_LOADING_FALSE = "SET_LOADING_FALSE";


const initialState = {
    showLogin: false,
    showResPass: false,
    isMenuShown: false,
    isFilterActive: false,
    isPeopleDivOpen: false,
    isContactOpen: false,
    roomCount: 1,
    roomList:[],
    isLoading: false,

};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_DATA: {
            return {
                ...state, data: action.data
            }
        }

        case SHOW_RESPASS_DIV:{
            return {
            ...state, showResPass: !state.showResPass,
                isMenuShown: false
            }
        }

        case FALSE_RESPASS_DIV:{
            return {
            ...state, showResPass: false
            }
        }

        case SHOW_LOGIN_DIV:{
            return {
            ...state, showLogin: !state.showLogin
            }
        }

        case SET_FALSE_LOGIN:{
            return {
            ...state, showLogin: false
            }
        }

        case SHOW_SMALL_MENU:{
            return {
                ...state, isMenuShown: !state.isMenuShown
            }
        }

        case SET_SMALL_MENU_STATUS:{
            return {
                ...state, isMenuShown: action.status
            }
        }

        case CHANGE_FILTER_STATUS:{
            return {
                ...state, isFilterActive: !state.isFilterActive
            }
        }

        case SHOW_PEOPLE_DIV:{
            return {
                ...state, isPeopleDivOpen: true
            }
        }

        case CHANGE_PEOPLE_DIV:{
            return {
                ...state, isPeopleDivOpen: !state.isPeopleDivOpen
            }
        }

        case SHOW_CONTACT_DIV:{
            return {
                ...state, isContactOpen: true
            }
        }

        case CHANGE_CONTACT_DIV:{
            return {
                ...state, isContactOpen: !state.isContactOpen
            }
        }

        case ADD_FIRST_ROOM:{
            return {
                ...state,
                roomCount: 1,
                roomList: [...state.roomList, state.roomCount]

            }
        }

        case ADD_ROOM:{
            return {
                ...state,
                roomCount: state.roomCount+1,
                roomList: [...state.roomList, state.roomCount]
            }
        }

        case REMOVE_ROOM:{
            return {
                ...state,
                roomList: state.roomList.filter((el)=>el !== action.id),
            }
        }
        case SET_LOADING_TRUE:{
            return {
                ...state,
                isLoading: true,
            }
        }
        case SET_LOADING_FALSE:{
            return {
                ...state,
                isLoading: false,
            }
        }


        default :
            return state
    }
}



export const changeIsLogin = () => ({
    type: SHOW_LOGIN_DIV
});

export const setFalseLogin = () => ({
    type: SHOW_LOGIN_DIV
});

export const changeIsResPass = () => ({
    type: SHOW_RESPASS_DIV
});

export const makeResPassFalse = () => ({
    type: FALSE_RESPASS_DIV
});

export const changeIsLoginFromAll = () => ({
    type: SHOW_LOGIN_DIV
});

export const setLoginToFalse =()=>({
    type: SET_FALSE_LOGIN
});

export const changeMenuStatus =()=>({
    type : SHOW_SMALL_MENU
});

export const setMenuStatus =(status)=>({
    type : SET_SMALL_MENU_STATUS,
    status
});

export const changeFilterStatus =()=>({
    type : CHANGE_FILTER_STATUS,

});


export const showPeopleDiv =()=>({
    type : SHOW_PEOPLE_DIV,


});


export const changePeopleDiv =()=>({
    type : CHANGE_PEOPLE_DIV,

});


export const showContactDiv =()=>({
    type : SHOW_CONTACT_DIV,


});
export const changeContactDiv =()=>({
    type : CHANGE_CONTACT_DIV,

});

export const addRoom =()=>({
    type : ADD_ROOM,

});



export const addFirstRoom =()=>({
    type : ADD_FIRST_ROOM,

});
export const removeSelectedRoom =(id)=>({
    type : REMOVE_ROOM,
    id

});


export const setLoadingTrue =()=>({
    type : SET_LOADING_TRUE,

});

export const setLoadingFalse =()=>({
    type : SET_LOADING_FALSE,

});

