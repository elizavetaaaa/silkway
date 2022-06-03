import axios from "axios";
import {setLoadingFalse} from "./visReducer";

const SEARCH_PLACE_REQUEST = 'SEARCH_PLACE_REQUEST';


const LOGIN = 'LOGIN';
const RESET_PASSWORD = 'RESET_PASSWORD';
const GET_HOTEL_FACILITIES_REQUEST = 'GET_HOTEL_FACILITIES_REQUEST';
const GET_STAR_RATING_REQUEST = 'GET_STAR_RATING_REQUEST';
const GET_ROOM_FACILITIES_REQUEST = 'GET_ROOM_FACILITIES_REQUEST';
const GET_FOOD_FACILITIES_REQUEST = 'GET_FOOD_FACILITIES_REQUEST';
const GET_SEARCH_RESULT = 'GET_SEARCH_RESULT';
const GET_SEARCH_EMPTY_RESULT = 'GET_SEARCH_EMPTY_RESULT';
const SET_CHOSEN_HOTEL = 'SET_CHOSEN_HOTEL';

const GET_CATEGORIES = 'GET_CATEGORIES';

const SET_BOOKING = 'SET_BOOKING'
const ADD_CHILD = 'ADD_CHILD'
const ADD_CHILD_TO_LIST = 'ADD_CHILD_TO_LIST'
const DELETE_CHILD = 'DELETE_CHILD'
const ADD_ROOM_ITEM = 'ADD_ROOM_ITEM'
const DELETE_ROOM = 'DELETE_ROOM'
const CLEAR_CHILD_LIST = 'CLEAR_CHILD_LIST'

const link = process.env.REACT_APP_MAIN_API;

const initialState = {
    data: [],
    searchResult: [],
    searchEmptyResult: '',
    starRatingList: [],
    hotelFacilitiesList: [],
    roomFacilitiesList: [],
    foodCategoriesList: [],
    chosenHotel: [],
    categories: [],
    childList:[],
    roomListAdded:[],
    roomNumbers:[],
    roomIdx:0
};


// reducer
export default (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_PLACE_REQUEST: {
            console.log("in action I catch" + action.payload)
            if (action.payload.user.user.role === 1) localStorage.setItem('ROLE', 'user');
            localStorage.setItem('USER', action.payload.user.user.email);
            return {
                ...state,
                user: action.payload.user,
                message: action.payload.message,
                role: action.payload.user.user.role,
                auth: true,
            }
        }
        case GET_STAR_RATING_REQUEST: {
            return {
                ...state,
                starRatingList: action.payload
            }
        }
        case GET_HOTEL_FACILITIES_REQUEST: {
            return {
                ...state,
                hotelFacilitiesList: action.payload
            }
        }
        case GET_ROOM_FACILITIES_REQUEST: {
            return {
                ...state,
                roomFacilitiesList: action.payload
            }
        }
        case GET_FOOD_FACILITIES_REQUEST: {
            return {
                ...state,
                foodCategoriesList: action.payload
            }
        }

        case GET_SEARCH_RESULT: {
            return {
                ...state,
                searchResult: action.payload
            }
        }

        case GET_SEARCH_EMPTY_RESULT: {
            return {
                ...state,
                searchEmptyResult: 'По вашему запросу ничего не найдено...'
            }
        }
        case SET_CHOSEN_HOTEL: {
            console.log("PAYLOAD" + action.payload)
            return {
                ...state,
                chosenHotel: action.payload
            }
        }

        case GET_CATEGORIES: {
            console.log("CATEGORIES" + action.payload)
            return {
                ...state,
                categories: action.payload
            }
        }
        case ADD_CHILD: {
            return {
                ...state,
                childList: [...state.childList, action.payload]
            }
        }

        case DELETE_CHILD: {
            return {
                ...state,
                childList: state.childList.filter((el)=> el!== action.payload)
            }
        }
        case ADD_ROOM_ITEM: {
            return {
                ...state,
                roomListAdded: [...state.roomListAdded, action.payload],
                roomIdx: state.roomIdx+1,
                roomNumbers: [...state.roomNumbers, state.roomIdx]
            }
        }

        case DELETE_ROOM: {
            return {
                ...state,
                roomListAdded: state.roomListAdded.filter((el)=> el!== action.payload)
            }
        }

        case CLEAR_CHILD_LIST: {
            return {
                ...state,
                childList: []
            }
        }
        default :
            return state


    }

};


export const searchPlaceRequest = (payload) => (dispatch) => {
    // localStorage.setItem('search', data)
    axios.get(`${link}search/?search=${payload.destination}&guests=${payload.guests}&currency_to_convert=${payload.currency}`)
        .then(({data}) => {
            dispatch({type: GET_SEARCH_RESULT, payload: data.results})
            if (data.results.length) {
                dispatch(setLoadingFalse());
            } else {
                dispatch(setLoadingFalse());
                dispatch({type: GET_SEARCH_EMPTY_RESULT});
            }
        })

};


// https://silk-travel.herokuapp.com/booking-app/facilitiels_of_hotels/


// export const getConfs = () => {
//     return (dispatch) => {
//         axios("https://zhoroev.pythonanywhere.com/api/v1/reservation/?format=json")
//             .then(({data}) => {
//                 console.log(data);
//                 return dispatch({type: GET_CONFS, data: data})
//             })
//     }
// };
export const getStarRating = () => {
    return (dispatch) => {
        axios.get(`${link}booking-app/hotel_stars_categories/`)
            .then(({data}) => {
                console.log("star rating" + JSON.stringify(data));
                return dispatch({type: GET_STAR_RATING_REQUEST, payload: data.results})
            })
            .catch((e) => {
                console.log(e)
            })

    }
};

export const getHotelFacilities = () => {
    return (dispatch) => {
        axios.get(`${link}booking-app/facilitiels_of_hotels/`)
            .then(({data}) => {
                return dispatch({type: GET_HOTEL_FACILITIES_REQUEST, payload: data.results})
            })
            .catch((e) => {
                console.log(e)
            })

    }
};

export const getRoomFacilities = () => {
    return (dispatch) => {
        axios.get(`${link}booking-app/facilitiels_of_rooms/`)
            .then(({data}) => {
                return dispatch({type: GET_ROOM_FACILITIES_REQUEST, payload: data.results});

            })
            .catch((e) => {
                console.log(e)
            })

    }
};


export const getFoodCategories = () => {
    return (dispatch) => {
        axios.get(`${link}booking-app/food_categories/`)
            .then(({data}) => {
                return dispatch({type: GET_FOOD_FACILITIES_REQUEST, payload: data.results})
            })
            .catch((e) => {
                console.log(e)
            })

    }
};

export const getCategories = () => {
    return (dispatch) => {
        axios.get(`${link}booking-app/categories/`)
            .then(({data}) => {
                return dispatch({type: GET_CATEGORIES, payload: data.results})
            })
            .catch((e) => {
                console.log(e)
            })

    }
};


export const setChosenHotel = (payload) => ({
    type: SET_CHOSEN_HOTEL, payload
});




export const sendBooking = (booking) => {
    let access = localStorage.getItem("ACCESS");
    access = access.slice(1, (access.length - 1))
    return (dispatch) => {
        axios.post(`${link}booking-app/bookings/`, booking,{
            headers: {'AUTHORIZATION': `Bearer ${access}`}
        })
            .then(({data}) => {
                console.log("booking send response" + JSON.stringify(data));
            })
            .catch((e) => {
                console.log(e)
            })

    }
};
export const addChildListAction =(payload)=>({
    type: ADD_CHILD, payload
});

export const addChildToList =(payload)=>({
    type: ADD_CHILD_TO_LIST, payload
});

export const deleteChildAction =(payload)=>({
    type: DELETE_CHILD, payload
});

export const addRoomItemAction =(payload)=>({
    type: ADD_ROOM_ITEM, payload
});

export const deleteRoomAction =(payload)=>({
    type: DELETE_ROOM, payload
});

export const clearChildListAction =()=>({
    type: CLEAR_CHILD_LIST
});



