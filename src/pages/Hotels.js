import React, {useEffect, useState} from 'react';
import HotelCard from "../components/hotels_page/HotelCard";
import {useDispatch, useSelector} from "react-redux";
import translate from "../i18n/translate";
import {BsTrash} from "react-icons/bs";

import {addRoom, changePeopleDiv, setLoadingFalse, setLoadingTrue, showPeopleDiv} from "../redux/reducer/visReducer";
import {
    addChildListAction,
    addRoomItemAction,
    clearChildListAction, clearEmptyMsgAction,
    deleteChildAction,
    deleteFilterAction,
    deleteFromFoodCatsFilterListAction,
    deleteFromHotelCatsFilterListAction,
    deleteFromRoomCatsFilterListAction, deleteFromStarListAction,
    deleteRoomAction, GET_SEARCH_EMPTY_RESULT, GET_SEARCH_ERROR_RESULT, GET_SEARCH_RESULT,
    searchFilteredRequest
} from "../redux/reducer/SearchReducer";
import FilterRoomFacilities from "../components/hotels_page/FilterRoomFacilities";
import FilterFoodCategories from "../components/hotels_page/FilterFoodCategories";
import FilterHotelFacilities from "../components/hotels_page/FilterHotelFacilities";
import {setLocale} from "../redux/reducer/lanReducer";
import {LOCALES} from "../i18n";
import location from "../images/icons/location.svg";
import calendar from "../images/icons/calendar.svg";
import person from "../images/icons/person.svg";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Login from "../components/Login";
import FilterStarRating from "../components/hotels_page/FilterStarRating";


const Hotels = () => {


    const starRatingList = useSelector(state => state.searchReducer.starRatingList);
    const hotelFacilitiesList = useSelector(state => state.searchReducer.hotelFacilitiesList);
    const roomFacilitiesList = useSelector(state => state.searchReducer.roomFacilitiesList);
    const foodCategoriesList = useSelector(state => state.searchReducer.foodCategoriesList);
    const searchResult = useSelector(state => state.searchReducer.searchResult);
    const categories = useSelector(state => state.searchReducer.categories);
    const addedFilterList = useSelector(state => state.searchReducer.addedFilterList);
    const hotelFacsRu = useSelector(state => state.searchReducer.hotelFacsRu);
    const hotelFacsEn = useSelector(state => state.searchReducer.hotelFacsEn);
    const isLoading = useSelector(state => state.store.isLoading);
    const roomList = useSelector(state => state.store.roomList);
    const addedStarList = useSelector(state => state.searchReducer.addedStarList);


    const dispatch = useDispatch();
    const isMenuShown = useSelector(state => state.store.isMenuShown);
    const isFilterActive = useSelector(state => state.store.isFilterActive);

    useEffect(()=>{
        if(searchEmptyResult==='' && searchResult===[]){
            window.location.replace('http://localhost:3000/')
        }
    },[])
    useEffect(() => {
        if (localStorage.getItem('lan') === 'ru') {
            dispatch(setLocale(LOCALES.RUSSIAN));
            document.getElementById('lang-small').value = 'RU';
            document.getElementById('lang').value = 'RU'
        } else {
            document.getElementById('lang-small').value = 'ENG';
            document.getElementById('lang').value = 'ENG';
            dispatch(setLocale(LOCALES.ENGLISH))
        }
        dispatch(clearEmptyMsgAction());

    }, []);
    let lan = localStorage.getItem('lan');


    const addedHotelCatsFilterList = useSelector(state => state.searchReducer.addedHotelCatsFilterList);
    const addedFoodCatsFilterList = useSelector(state => state.searchReducer.addedFoodCatsFilterList);
    const addedRoomCatsFilterList = useSelector(state => state.searchReducer.addedRoomCatsFilterList);


    const deleteFilter = (filter) => {
        dispatch(deleteFilterAction(filter));
        dispatch(deleteFromHotelCatsFilterListAction(filter))
        dispatch(deleteFromFoodCatsFilterListAction(filter))
        dispatch(deleteFromRoomCatsFilterListAction(filter))
        dispatch(deleteFromStarListAction(filter))
    };

    const makeFilterSearch = () => {
        let searchStr = '';
        let searchArr = [];
        addedHotelCatsFilterList.map((el) => {
            searchStr += `facilities_hotel_id__term=${el.id}&`;
        });
        addedFoodCatsFilterList.map((el) => {
            searchStr += `food_category__term=${el.id}&`;
        });
        addedRoomCatsFilterList.map((el) => {
            searchArr.push(el.id)
        });
        addedStarList.map((el) => {
            searchStr +=(`hotel_category=${el.id}&`)
        });
        console.log(searchStr);
        searchStr = searchStr+`room_category_ids=[`+ searchArr + `]`;
        console.log(searchStr)
        dispatch(searchFilteredRequest(searchStr))

        // dispatch(tryMe(searchStr))


    };
    const searchEmptyResult = useSelector(state => state.searchReducer.searchEmptyResult);
    const isPeopleDivOpen = useSelector(state => state.store.isPeopleDivOpen);
    const childList = useSelector(state => state.searchReducer.childList);
    const roomListAdded = useSelector(state => state.searchReducer.roomListAdded);
    const roomNumbers = useSelector(state => state.searchReducer.roomNumbers);

    let yourDate = new Date();
    let check_in_day = yourDate.toISOString().split('T')[0];


    let tomorrow = new Date()
    tomorrow.setDate(yourDate.getDate() + 1);
    let check_out_day = tomorrow.toISOString().split('T')[0];
    const [adults, setAdults] = useState(0);

    const decreaseAdults = () => {
        if (adults <= 6 && adults > 1) setAdults(adults - 1);

    };
    const changePeopleHandler = (e) => {
        setPeople((pref) => {
            return {
                ...pref, [e.target.name]: e.target.value
            }
        })
    };
    const [people, setPeople] = useState({
        adults: 0,
        children: 0
    });

    const increaseAdults = () => {
        if (adults < 6) setAdults(adults + 1);

    }
    const addChild = (el) => {
        dispatch(addChildListAction(el));
        if (childList.length === 3) {
            document.getElementById('main-child-select').style.display = 'none';

        }
        document.getElementById('main-child-div').style.display = 'flex';
        document.getElementById('sec-select').style.display = 'flex';

    };
    const childrenAgesListRu = ['0 лет', '1 год', '2 года', '3 года', '4 года', '5 лет', '6 лет', '7 лет', '8 лет', '9 лет', '10 лет', '11 лет', '12 лет', '13 лет', '14 лет', '15 лет', '16 лет', '17 лет'];
    const childrenAgesListEng = ['0 years', '1 years', '2 years', '3 years', '4 years', '5 years', '6 years', '7 years', '8 years', '9 years', '10 years', '11 years', '12 years', '13 years', '14 years', '15 years', '16 years', '17 years']

    const deleteChild = (el) => {

        dispatch(deleteChildAction(el));
        if (childList.length < 5) {
            document.getElementById('main-child-select').style.display = 'flex';
        }

    };
    const addRoomItem = () => {
        let people = {
            adultNum: adults,
            children: childList
        };
        if (people.adultNum === 0 && people.children.length === 0) {
        } else dispatch(addRoomItemAction(people));

        setAdults(0);
        dispatch(clearChildListAction())
    };
    const deleteRoom = (el) => {
        dispatch(deleteRoomAction(el))
    };
    const compactPeople = () => {
        let peopleSum = 0;
        roomListAdded.map((el) => {
            peopleSum += el.adultNum;
            peopleSum += el.children.length
        });
        setGuests(0);
        setGuests(peopleSum);
        localStorage.setItem("num_of_guests", peopleSum);
        dispatch(changePeopleDiv());

    };
    const [guests, setGuests] = useState(0);
    const [search, setSearch] = useState({
        destination: '',
        check_in: check_in_day,
        check_out: check_out_day
    });
    const searchChangeHandler = (e) => {
        setSearch((pref) => {
            return {
                ...pref, [e.target.name]: e.target.value
            }
        })
    };



    const openPeopleDiv = () => {
        dispatch(showPeopleDiv());
        dispatch(addRoom());
    };

    const searchHotel = (e) => {
        e.preventDefault();

        let myList =[];
        roomListAdded.map((el, idx)=>{
            let kids = []

            el.children.map((el)=>{
                let age = el.replace('years','');
                age = age.replace('лет','');
                age = age.replace('года','');
                age = age.replace('год','');
                age =+age;
                kids.push(age);

            });
            myList[idx] ={
                ad: el.adultNum,
                ch: kids
            }
        });

        let str = '';
        myList.map((el)=>{
            let chidrenStr ='';
            if(el.ch.length){
                el.ch.map((item)=>{
                    chidrenStr+=item+'.'
                });
                chidrenStr = chidrenStr.slice(0,-1)}
            else chidrenStr ='0';

            str+= `${el.ad}and${chidrenStr}-`
        });
        str = str.slice(0,-1);
        let payload ={
            destination: search.destination,
            guests: str,
            currency: localStorage.getItem('currency')
        };


        localStorage.setItem('check_in', search.check_in);
        localStorage.setItem('check_out', search.check_out);
        localStorage.setItem('search', search.destination);
        localStorage.setItem('num_of_guests_str', str)

        dispatch(setLoadingTrue());
        dispatch(searchPlaceRequest(payload));


    };

    const searchPlaceRequest = (payload) => (dispatch) => {
        dispatch(setLoadingTrue());

        axios.get(`${link}search/?search=${payload.destination}&guests=${payload.guests}&currency_to_convert=${payload.currency}&room_category_ids=[]`)
            .then(({data}) => {
                dispatch({type: GET_SEARCH_RESULT, payload: data.results})
                if (data.results.length) {
                    dispatch(setLoadingFalse());
                    dispatch(clearEmptyMsgAction());
                    navigate('/hotels');
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
    const link = process.env.REACT_APP_MAIN_API;
    const navigate = useNavigate();





    return (
        <div className="hotels" style={{display: isMenuShown ? 'none' : 'block'}}>


            <div className="booking__people-forms hotels__people-form" style={{display: isPeopleDivOpen && roomList.length ? 'flex' : 'none'}}>
                <div className="booking__people-add hotels__people-add">
                    <div className="booking__room-top">
                        <h4 className="booking__room-title">{translate("Добавить комнату")}</h4>
                    </div>

                    <div className="booking__inputs-div">
                        <div className="booking__people-input-div">
                            <label htmlFor=""
                                   className="booking__label booking__people-label">{translate('Взрослые')}</label>
                            <div className="booking__add-adult-block">
                                <button className="booking__adult-btn" onClick={() => decreaseAdults()}>-</button>
                                <input type="text" min="1" max="9" placeholder=""
                                       className="booking__people-input"
                                       name="adults"
                                       value={adults}
                                       onChange={changePeopleHandler}/>
                                <button className="booking__adult-btn" onClick={() => increaseAdults()}>+</button>
                            </div>


                        </div>

                        <div className="booking__people-input-div">
                            <label
                                style={{display: childList.length >= 4 ? 'none' : 'block'}}
                                className="booking__label booking__people-label">{translate('Дети')}</label>
                            <select type="number" id="main-child-select" placeholder="добавить ребенка"
                                    className="booking__people-input booking__child-input"
                                    name="children" value={people.children}
                                    onChange={(e) => addChild(e.target.value)}>
                                <option selected={true}>добавить ребенка</option>
                                {localStorage.getItem('lan') === 'ru' ?
                                    childrenAgesListRu.map((el) => {
                                        return <option value={el}
                                        >{el}</option>
                                    })
                                    : childrenAgesListEng.map((el) => {
                                        return <option value={el}>{el}</option>
                                    })}
                            </select>

                        </div>


                    </div>
                    <p className="booking__child-label"
                       style={{display: childList.length >= 4 ? 'block' : 'none'}}>{translate('Дети')} :</p>
                    <div className="booking__added-clildren">
                        {childList?.map((el, idx) => {
                            return <div className="booking__main-child-div" id="child-div-sec"
                            >
                                <p>{el}</p>
                                <button className="booking__main-child-btn" id="main-child-btn"
                                        onClick={() => deleteChild(el)}>Х
                                </button>
                            </div>
                        })}

                    </div>
                    <div className="booking__room-btns">
                        <button className="booking__room-ready-btn"
                                onClick={() => addRoomItem()}>{translate('Добавить')}</button>
                    </div>

                </div>


                <div className="booking__rooms">
                    <p className="booking__rooms-title"
                       style={{display: roomListAdded.length > 0 ? 'block' : 'none'}}>Добавленные комнаты :</p>
                    {roomListAdded.length > 0 ? roomListAdded?.map((el, idx) => {
                        return <div className="booking__room">
                            <p className="booking__room-num">{translate('Комната')} {roomNumbers[idx] + 1} </p>
                            <p>{translate('Взрослые')} : {el.adultNum}</p>
                            <p style={{display: el?.children?.length ? 'block' : 'none'}}>{translate('Дети')} : {el.children?.map((child) => {
                                return child + ' '
                            })}</p>

                            <button className="booking__remove-room-btn"
                                    onClick={() => deleteRoom(el)}><BsTrash/></button>
                        </div>
                    }) : ''}


                    <button className="booking__room-ready-btn"
                            onClick={() => compactPeople()}
                            style={{display: roomListAdded.length ? 'block' : 'none'}}>Готово
                    </button>
                </div>


            </div>

            <div className="container hotels__container">

    <form className="booking__form hotels__form" onSubmit={(e)=>searchHotel(e)}>
        <div className="booking__el">
            <img src={location} alt="location" className="booking__icon"/>
            <div className="booking__dest-div">
                <label htmlFor="" className="booking__label">{translate('Направление')}</label>
                <input type="text" placeholder='Город или отель' className="booking__input"
                       name="destination" value={search.destination}
                       required
                       onChange={searchChangeHandler}/>
            </div>
        </div>

        <div className="booking__el">
            <img src={calendar} alt="location" className="booking__icon"/>
            <div className="booking__date-div">
                <label htmlFor="" className="booking__label">{translate('Заезд')}</label>
                <input type="date" placeholder="22-10-2023" className="booking__input"
                       name="check_in" onChange={searchChangeHandler}
                       required
                       value={search.check_in}
                />
            </div>
        </div>

        <div className="booking__el">
            <img src={calendar} alt="location" className="booking__icon"/>
            <div className="booking__date-div">
                <label htmlFor="" className="booking__label">{translate('Выезд')}</label>
                <input type="date" placeholder="22-11-2023" className="booking__input"
                       name="check_out"
                       value={search.check_out}
                       required
                       onChange={searchChangeHandler}/>
            </div>
        </div>

        <div className="booking__el">
            <img src={person} alt="location" className="booking__icon"/>
            <div className="booking__guest-div">
                <label htmlFor="" className="booking__label">{translate('Гости')}</label>
                <input type="text" placeholder="4 person" className="booking__input"
                       value={guests}
                       required
                       onClick={() => openPeopleDiv()}/>
            </div>
        </div>

        <div className="booking__el">
            <button className="booking__btn" type="submit"
                    >{translate('Поиск')}</button>
        </div>
    </form>
    {/*// добавление номеров*/}
</div>

            {/*<div className="hotels__top-section">*/}
            {/*    <div className="hotels__filter-btns">*/}
            {/*        <button className="hotels__filter-btn"*/}
            {/*                style={{color: isFilterActive ? '#0fab60' : 'grey'}}*/}
            {/*                onClick={() => filterHandler()}>{translate('Фильтры')}<AiFillCheckSquare*/}
            {/*            className="booking__filter-icon"/></button>*/}
            {/*        <button className="hotels__filter-btn" style={{display: isFilterActive ? 'block' : 'none'}}>Поиск по*/}
            {/*            фильтрам*/}
            {/*        </button>*/}

            {/*    </div>*/}

            {/*    <form className="booking__form hotels__form">*/}

            {/*        <div className="booking__el hotels__el">*/}
            {/*            <img src={location} alt="location" className="booking__icon"/>*/}
            {/*            <div className="booking__dest-div">*/}
            {/*                <label htmlFor="" className="booking__label">{translate('Направление')}</label>*/}
            {/*                <input type="text" placeholder='Город или отель' className="booking__input"/>*/}
            {/*            </div>*/}
            {/*        </div>*/}

            {/*        <div className="booking__el hotels__el">*/}
            {/*            <img src={calendar} alt="location" className="booking__icon"/>*/}
            {/*            <div className="booking__date-div">*/}
            {/*                <label htmlFor="" className="booking__label">{translate('Заезд')}</label>*/}
            {/*                <input type="date" placeholder="22-10-2023" className="booking__input"/>*/}
            {/*            </div>*/}
            {/*        </div>*/}

            {/*        <div className="booking__el hotels__el">*/}
            {/*            <img src={calendar} alt="location" className="booking__icon"/>*/}
            {/*            <div className="booking__date-div">*/}
            {/*                <label htmlFor="" className="booking__label">{translate('Выезд')}</label>*/}
            {/*                <input type="date" placeholder="22-11-2023" className="booking__input"/>*/}
            {/*            </div>*/}
            {/*        </div>*/}

            {/*        <div className="booking__el hotels__el">*/}
            {/*            <img src={person} alt="location" className="booking__icon"/>*/}
            {/*            <div className="booking__guest-div">*/}
            {/*                <label htmlFor="" className="booking__label">{translate('Гости')}</label>*/}
            {/*                <input type="text" placeholder="4 person" className="booking__input"/>*/}
            {/*            </div>*/}
            {/*        </div>*/}

            {/*        <div className="booking__el hotels__el">*/}
            {/*            <button className="booking__btn hotels__btn">{translate('Поиск')}</button>*/}
            {/*        </div>*/}

            {/*    </form>*/}
            {/*</div>*/}



            <div className="hotels__added-filters"
                 style={{display: (addedFoodCatsFilterList.length || addedRoomCatsFilterList.length || addedHotelCatsFilterList.length || addedStarList.length)  && !isPeopleDivOpen? 'flex' : 'none'}}>
                <p className="hotels__added-filters-title">{translate('Выбранные фильтры')}:</p>
                {addedFoodCatsFilterList?.map((el) => {
                    return <div className="hotels__added-filter">
                        <p>{lan === 'ru' ? el.food_category_name_ru : el.food_category_name_en}</p>
                        <button className="hotels__delete-filter-btn"
                                onClick={() => deleteFilter(el)}>Х
                        </button>
                    </div>
                })}

                {addedStarList?.map((el) => {
                    return <div className="hotels__added-filter">
                        <p>{lan === 'ru' ? el.hotel_category_name_ru : el.hotel_category_name_en}</p>
                        <button className="hotels__delete-filter-btn"
                                onClick={() => deleteFilter(el)}>Х
                        </button>
                    </div>
                })}

                {addedRoomCatsFilterList?.map((el) => {
                    return <div className="hotels__added-filter">
                        <p>{lan === 'ru' ? el.room_category_name_ru : el.room_category_name_ru}</p>
                        <button className="hotels__delete-filter-btn"
                                onClick={() => deleteFilter(el)}>Х
                        </button>
                    </div>
                })}

                {addedHotelCatsFilterList?.map((el) => {
                    return <div className="hotels__added-filter">
                        <p>{lan === 'ru' ? el.hotel_category_name_ru : el.hotel_category_name_en}</p>
                        <button className="hotels__delete-filter-btn"
                                onClick={() => deleteFilter(el)}>Х
                        </button>
                    </div>
                })}
                <div className="hotels__filter-btn-div">
                    <button className="hotels__added-filters-btn"
                            onClick={() => makeFilterSearch()}
                    >{translate('Применить поиск по фильтрам')}</button>
                </div>


            </div>


            <div className="hotels__main">
                <div className="hotels__filters">
                        <FilterStarRating props={translate("Количество звезд")} list={starRatingList}/>


                    {lan === 'RU' ?
                        Object.entries(hotelFacsEn).map(([key, value]) => {
                            return <FilterHotelFacilities props={key} list={value} parent={'hotel_category'}/>
                        })
                        :
                        Object.entries(hotelFacsRu).map(([key, value]) => {
                            return <FilterHotelFacilities props={key} list={value} parent={'hotel_category'}/>
                        })
                    }
                    <FilterFoodCategories props={translate("Питание")} list={foodCategoriesList}/>

                    <FilterRoomFacilities props={translate("Услуги комнат")} list={roomFacilitiesList}/>

                </div>

                <img className="booking__loading"
                     style={{display: isLoading ? 'block' : 'none'}}
                     src={require('../images/loading.gif')}
                     alt="loading..."/>


                {/*<div className="hotels__filters-small" style={{*/}
                {/*    display: isFilterActive ? 'block' : 'none', background: '#fff'*/}
                {/*}}>*/}
                {/*    <FilterHotelFacilities props={translate("Количество звезд")} list={starRatingList}/>*/}
                {/*    <FilterHotelFacilities props={translate("Услуги отелей")} list={hotelFacilitiesList}/>*/}
                {/*    <FilterRoomFacilities props={translate("Услуги комнат")} list={roomFacilitiesList}/>*/}
                {/*    <FilterFoodCategories props={translate("Питание")} list={foodCategoriesList}/>*/}

                {/*</div>*/}


                <div className="hotels__cards" style={{
                    display: !isFilterActive ? 'block' : 'none', background: '#fff',
                    opacity: isPeopleDivOpen ? '40%' : '100%'
                }}>

                    <div className="hotels__empty-res-div" style={{display :searchEmptyResult.length ? 'block' : 'none' }}>
                        <p className="hotels__empty-result">{searchEmptyResult}</p>

                    </div>



                    {/*<HotelCard/>*/}
                    {searchResult.map((item) => {
                        return <HotelCard props={item}/>
                    })
                    }

                </div>
            </div>


        </div>
    );
};

export default Hotels;