import axios from "axios";
import {setLoadingFalse, setLoadingTrue} from "./visReducer";

const SEARCH_PLACE_REQUEST = 'SEARCH_PLACE_REQUEST';


const LOGIN = 'LOGIN';
const RESET_PASSWORD = 'RESET_PASSWORD';
const GET_HOTEL_FACILITIES_REQUEST = 'GET_HOTEL_FACILITIES_REQUEST';
const GET_STAR_RATING_REQUEST = 'GET_STAR_RATING_REQUEST';
const GET_ROOM_FACILITIES_REQUEST = 'GET_ROOM_FACILITIES_REQUEST';
const GET_FOOD_FACILITIES_REQUEST = 'GET_FOOD_FACILITIES_REQUEST';
export const GET_SEARCH_RESULT = 'GET_SEARCH_RESULT';
export const GET_SEARCH_EMPTY_RESULT = 'GET_SEARCH_EMPTY_RESULT';
export const GET_SEARCH_ERROR_RESULT = 'GET_SEARCH_ERROR_RESULT';
const CLEAR_SEARCH_RESULT = 'CLEAR_SEARCH_RESULT';
const SET_CHOSEN_HOTEL = 'SET_CHOSEN_HOTEL';

const GET_CATEGORIES = 'GET_CATEGORIES';

const SET_BOOKING = 'SET_BOOKING'
const ADD_CHILD = 'ADD_CHILD'
const ADD_CHILD_TO_LIST = 'ADD_CHILD_TO_LIST'
const DELETE_CHILD = 'DELETE_CHILD'
const ADD_ROOM_ITEM = 'ADD_ROOM_ITEM'
const DELETE_ROOM = 'DELETE_ROOM'
const CLEAR_CHILD_LIST = 'CLEAR_CHILD_LIST'
const CLEAR_ROOMS = 'CLEAR_ROOMS'
const SET_HOTEL_FACS = 'SET_HOTEL_FACS'
const ADD_TO_FILTER_LIST = 'ADD_TO_FILTER_LIST'
const DELETE_FROM_FILTER_LIST = 'DELETE_FROM_FILTER_LIST'
const ADD_TO_HOTEL_CATS_FILTER_LIST = 'ADD_TO_HOTEL_CATS_FILTER_LIST'
const ADD_TO_FOOD_CATS_FILTER_LIST = 'ADD_TO_FOOD_CATS_FILTER_LIST'
const ADD_TO_ROOM_CATS_FILTER_LIST = 'ADD_TO_ROOM_CATS_FILTER_LIST'
const DELETE_FROM_HOTEL_CATS_FILTER_LIST = 'DELETE_FROM_HOTEL_CATS_FILTER_LIST'
const DELETE_FROM_FOOD_CATS_FILTER_LIST = 'DELETE_FROM_FOOD_CATS_FILTER_LIST'
const DELETE_FROM_ROOM_CATS_FILTER_LIST = 'DELETE_FROM_ROOM_CATS_FILTER_LIST'

const SEARCH_FILTERED_REQUEST = 'SEARCH_FILTERED_REQUEST'
const CLEAR_EMPTY_MSG =  'CLEAR_EMPTY_MSG'
const ADD_TO_STAR_LIST =  'ADD_TO_STAR_LIST'
const DELETE_FROM_STAR_LIST =  'DELETE_FROM_STAR_LIST'
const OPEN_PHONE_POPUP =  'OPEN_PHONE_POPUP'
const CLOSE_PHONE_POPUP =  'CLOSE_PHONE_POPUP'
const BOOKING_SUCCESS = 'BOOKING_SUCCESS'
const CLOSE_BOOKING_SUCCESS = 'CLOSE_BOOKING_SUCCESS'


const link = process.env.REACT_APP_MAIN_API;
const link_ru = process.env.REACT_APP_MAIN_API_RU;

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
    childList: [],
    roomListAdded: [],
    roomNumbers: [],
    roomIdx: 0,
    hotelFacsRu: [],
    hotelFacsEn: [],
    addedFilterList: [],
    addedHotelCatsFilterList: [],
    addedHotelCatsStr: '',
    addedFoodCatsFilterList: [],
    addedStarList: [],
    addedRoomCatsFilterList: [],
    phonePopupStatus: false,
    bookSuccessPopupStatus: false
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
                searchEmptyResult: 'К сожалению, по вашему запросу ничего не найдено...'
            }
        }
        case GET_SEARCH_ERROR_RESULT: {
            return {
                ...state,
                searchEmptyResult: 'Внутренняя ошибка сервера. Пожалуйста, повторите попытку позже.'
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
                childList: state.childList.filter((el) => el !== action.payload)
            }
        }
        case ADD_ROOM_ITEM: {
            return {
                ...state,
                roomListAdded: [...state.roomListAdded, action.payload],
                roomIdx: state.roomIdx + 1,
                roomNumbers: [...state.roomNumbers, state.roomIdx]
            }
        }

        case DELETE_ROOM: {
            return {
                ...state,
                roomListAdded: state.roomListAdded.filter((el) => el !== action.payload)
            }
        }

        case CLEAR_CHILD_LIST: {
            return {
                ...state,
                childList: []
            }
        }
        case CLEAR_SEARCH_RESULT: {
            return {
                ...state,
                searchResult: [],
                searchEmptyResult: ''
            }
        }
        case CLEAR_ROOMS: {
            return {
                ...state,
                roomListAdded: [],
            }
        }
        case SET_HOTEL_FACS: {
            return {
                ...state,
                hotelFacsRu: action.listRu,
                hotelFacsEn: action.listEn,
            }
        }
        case ADD_TO_FILTER_LIST: {
            return {
                ...state,
                addedFilterList: [...state.addedFilterList, action.payload],
            }
        }
        case DELETE_FROM_FILTER_LIST: {
            return {
                ...state,
                addedFilterList: state.addedFilterList.filter((el) => el !== action.payload)
            }
        }
        case ADD_TO_HOTEL_CATS_FILTER_LIST: {
            return {
                ...state,
                addedHotelCatsFilterList: [...state.addedHotelCatsFilterList, action.payload],
            }
        }

        case DELETE_FROM_HOTEL_CATS_FILTER_LIST: {
            return {
                ...state,
                addedHotelCatsFilterList: state.addedHotelCatsFilterList.filter((el) => el !== action.payload),
            }
        }
        case ADD_TO_FOOD_CATS_FILTER_LIST: {
            return {
                ...state,
                addedFoodCatsFilterList: [...state.addedFoodCatsFilterList, action.payload],
            }
        }

        case DELETE_FROM_FOOD_CATS_FILTER_LIST: {
            return {
                ...state,
                addedFoodCatsFilterList: state.addedFoodCatsFilterList.filter((el) => el !== action.payload),
            }
        }
        case ADD_TO_ROOM_CATS_FILTER_LIST: {
            return {
                ...state,
                addedRoomCatsFilterList: [...state.addedRoomCatsFilterList, action.payload],
            }
        }

        case DELETE_FROM_ROOM_CATS_FILTER_LIST: {
            return {
                ...state,
                addedRoomCatsFilterList: state.addedRoomCatsFilterList.filter((el) => el !== action.payload),
            }
        }

        case ADD_TO_STAR_LIST: {
            return {
                ...state,
                addedStarList: [...state.addedStarList, action.payload],
            }
        }

        case DELETE_FROM_STAR_LIST: {
            return {
                ...state,
                addedStarList: state.addedStarList.filter((el) => el !== action.payload),
            }
        }
        case CLEAR_EMPTY_MSG: {
            return {
                ...state,
                searchEmptyResult: '',
            }
        }

        case OPEN_PHONE_POPUP: {
            return {
                ...state,
                phonePopupStatus: true,
            }
        }
        case CLOSE_PHONE_POPUP: {
            return {
                ...state,
                phonePopupStatus: false,
            }
        }
        case BOOKING_SUCCESS: {
            return {
                ...state,
                phonePopupStatus: false,
                bookSuccessPopupStatus: true
            }
        }
        case CLOSE_BOOKING_SUCCESS: {
            return {
                ...state,
                bookSuccessPopupStatus: false
            }
        }

        default :
            return state


    }

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
        axios.post(`${link}booking-app/bookings/`, booking, {
            headers: {'AUTHORIZATION': `Bearer ${access}`}
        })
            .then(({data}) => {
                dispatch({type: BOOKING_SUCCESS})
                console.log("booking send response" + JSON.stringify(data));
            })
            .catch((e) => {
                console.log(e)
            })

    }
};
export const addChildListAction = (payload) => ({
    type: ADD_CHILD, payload
});

export const addChildToList = (payload) => ({
    type: ADD_CHILD_TO_LIST, payload
});

export const deleteChildAction = (payload) => ({
    type: DELETE_CHILD, payload
});

export const addRoomItemAction = (payload) => ({
    type: ADD_ROOM_ITEM, payload
});

export const deleteRoomAction = (payload) => ({
    type: DELETE_ROOM, payload
});

export const clearChildListAction = () => ({
    type: CLEAR_CHILD_LIST
});
export const clearSearchResultAction = () => ({
    type: CLEAR_SEARCH_RESULT
});
export const clearRoomListAction = () => ({
    type: CLEAR_ROOMS
});

export const setHotelFacsAction = (listRu, listEn) => {

    return {
        type: SET_HOTEL_FACS, listRu, listEn
    }
}
export const addToFilterListAction = (payload) => {

    return {
        type: ADD_TO_FILTER_LIST, payload
    }
}
export const deleteFilterAction = (payload) => ({
    type: DELETE_FROM_FILTER_LIST, payload
});


export const addToHotelCAtsFilterListAction = (payload) => ({
    type: ADD_TO_HOTEL_CATS_FILTER_LIST, payload
})

export const deleteFromHotelCatsFilterListAction = (payload) => ({
    type: DELETE_FROM_HOTEL_CATS_FILTER_LIST, payload
})

export const addToFoodCAtsFilterListAction = (payload) => ({
    type: ADD_TO_FOOD_CATS_FILTER_LIST, payload
});

export const deleteFromFoodCatsFilterListAction = (payload) => ({
    type: DELETE_FROM_FOOD_CATS_FILTER_LIST, payload
});

export const addToRoomCatsFilterListAction = (payload) => ({
    type: ADD_TO_ROOM_CATS_FILTER_LIST, payload
});

export const deleteFromRoomCatsFilterListAction = (payload) => ({
    type: DELETE_FROM_ROOM_CATS_FILTER_LIST, payload
});

export const addToStarListAction = (payload) => ({
    type: ADD_TO_STAR_LIST, payload
});

export const deleteFromStarListAction = (payload) => ({
    type: DELETE_FROM_STAR_LIST, payload
});


// const searchPlaceRequest = (payload) => (dispatch) => {
//     dispatch(setLoadingTrue());
//
//     axios.get(`${link}search/?search=${payload.destination}&guests=${payload.guests}&currency_to_convert=${payload.currency}`)
//         .then(({data}) => {
//             dispatch({type: GET_SEARCH_RESULT, payload: data.results})
//             if (data.results.length) {
//                 dispatch(setLoadingFalse());
//                 navigate('/hotels');
//             } else {
//                 dispatch(setLoadingFalse());
//                 dispatch({type: GET_SEARCH_EMPTY_RESULT});
//             }
//         })
//         .catch((e)=>{
//             // console.log(e)
//             dispatch(setLoadingFalse());
//             dispatch({type:GET_SEARCH_ERROR_RESULT});
//
//         })
//
// };
// export const searchFilteredRequest = (url) => {
//     console.log(url)
// let access = localStorage.getItem("ACCESS");
// // access = access.slice(1, (access.length - 1))
// let destination = localStorage.getItem('search');
// let num_of_guests_str = localStorage.getItem('num_of_guests_str');
// let currency = localStorage.getItem('currency');
// let lan = localStorage.getItem('lan');
// if(lan === 'ru'){
//     let myurl = `${link_ru}search/?${url}search=${destination}&guests=${num_of_guests_str}&currency_to_convert=${currency}&room_category_ids=[]`;
//     console.log(myurl)
// }


// return (dispatch) => {
//     axios.post(`${link}search/?${string}/search=${destination}&guests=${num_of_guests_str}&currency_to_convert=${currency}`, {
//         headers: {'AUTHORIZATION': `Bearer ${access}`}
//     })
//         .then(({data}) => {
//             console.log("booking send response" + JSON.stringify(data));
//         })
//         .catch((e) => {
//             console.log(e)
//         })
//
// }
// };

export const searchFilteredRequest = (url) => async (dispatch) => {
    let access = localStorage.getItem("ACCESS");
    // access = access.slice(1, (access.length - 1))
    let destination = localStorage.getItem('search');
    let num_of_guests_str = localStorage.getItem('num_of_guests_str');
    let currency = localStorage.getItem('currency');
    let lan = localStorage.getItem('lan');
    let myurl = `${link}search/?search=${destination}&${url}&guests=${num_of_guests_str}&currency_to_convert=${currency}`;
    console.log(myurl)

    dispatch(setLoadingTrue());

    axios.get(myurl)
        .then(({data}) => {
            dispatch({type: GET_SEARCH_RESULT, payload: data.results})
            if (data.results.length) {
                dispatch(setLoadingFalse());
            } else {
                dispatch(setLoadingFalse());
                dispatch({type: GET_SEARCH_EMPTY_RESULT});
            }
        })
        .catch((e)=>{
            // console.log(e)
            dispatch(setLoadingFalse());
            dispatch({type:GET_SEARCH_ERROR_RESULT});

        })


};

export const clearEmptyMsgAction = () => ({
    type: CLEAR_EMPTY_MSG
});

export const openPhonePopupAction = () => ({
    type: OPEN_PHONE_POPUP
});
export const closePhonePopupAction = () => ({
    type: CLOSE_PHONE_POPUP
});

export const closeBookSuccessAction = () => ({
    type: CLOSE_BOOKING_SUCCESS
});


