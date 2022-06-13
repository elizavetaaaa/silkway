import React, {useEffect, useState} from 'react';
import location from '../images/icons/location.svg'
import calendar from '../images/icons/calendar.svg'
import person from '../images/icons/person.svg'
import Login from "./Login";
import RemindPass from "./RemindPass";
import SmallMenu from "./SmallMenu";
import {useDispatch, useSelector} from "react-redux";
import translate from "../i18n/translate";
import {
    addFirstRoom,
    addRoom,
    changePeopleDiv,
    removeSelectedRoom, setLoadingFalse,
    setLoadingTrue,
    showPeopleDiv
} from "../redux/reducer/visReducer";
import {
    addChildListAction,
    addChildToList, addRoomItemAction, clearChildListAction, clearRoomListAction, clearSearchResultAction,
    deleteChildAction, deleteRoomAction, GET_SEARCH_EMPTY_RESULT, GET_SEARCH_ERROR_RESULT, GET_SEARCH_RESULT,
    searchPlaceRequest
} from "../redux/reducer/SearchReducer";
import {useNavigate} from "react-router-dom";
import {BsTrash} from "react-icons/bs";
import axios from "axios";



const Booking = () => {
    const link = process.env.REACT_APP_MAIN_API;


    const isMenuShown = useSelector(state => state.store.isMenuShown);
    const isPeopleDivOpen = useSelector(state => state.store.isPeopleDivOpen);
    const roomList = useSelector(state => state.store.roomList);
    const searchResult = useSelector(state => state.searchReducer.searchResult);
    const searchEmptyResult = useSelector(state => state.searchReducer.searchEmptyResult);
    const childList = useSelector(state => state.searchReducer.childList);
    const roomListAdded = useSelector(state => state.searchReducer.roomListAdded);
    const roomNumbers = useSelector(state => state.searchReducer.roomNumbers);
    const isLoading = useSelector(state => state.store.isLoading);

    const dispatch = useDispatch();

    const openPeopleDiv = () => {
        dispatch(showPeopleDiv());
        dispatch(addRoom());
    };
    const addRoomItem = () => {
        let people = {
            adultNum: adults,
            children: childList
        };
        if (people.adultNum === 0 && people.children.length === 0) {
        }
        else  dispatch(addRoomItemAction(people));

        setAdults(0);
        dispatch(clearChildListAction())
    };

    const [people, setPeople] = useState({
        adults: 0,
        children: 0
    });


    const changePeopleHandler = (e) => {
        setPeople((pref) => {
            return {
                ...pref, [e.target.name]: e.target.value
            }
        })
    };


    let yourDate = new Date();
    let check_in_day = yourDate.toISOString().split('T')[0];


    let tomorrow = new Date()
    tomorrow.setDate(yourDate.getDate() + 1);
    let check_out_day = tomorrow.toISOString().split('T')[0];

//returns the tomorrow date
    // tomorrow = tomorrow.toISOString().split('T')[0];
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


    const navigate = useNavigate();



    const removeRoom = (id) => {
        dispatch(removeSelectedRoom(id))
    };


    const [guests, setGuests] = useState(0);
    const [adults, setAdults] = useState(0);
    const increaseAdults = () => {
        if (adults < 6) setAdults(adults + 1);

    }
    const decreaseAdults = () => {
        if (adults <= 6 && adults > 1) setAdults(adults - 1);

    };
    const childrenAgesListRu = ['0 лет', '1 год', '2 года', '3 года', '4 года', '5 лет', '6 лет', '7 лет', '8 лет', '9 лет', '10 лет', '11 лет', '12 лет', '13 лет', '14 лет', '15 лет', '16 лет', '17 лет'];
    const childrenAgesListEng = ['0 years', '1 years', '2 years', '3 years', '4 years', '5 years', '6 years', '7 years', '8 years', '9 years', '10 years', '11 years', '12 years', '13 years', '14 years', '15 years', '16 years', '17 years']
    const addChild = (el) => {
        dispatch(addChildListAction(el));
        if (childList.length === 3) {
            document.getElementById('main-child-select').style.display = 'none';

        }
        document.getElementById('main-child-div').style.display = 'flex';
        document.getElementById('sec-select').style.display = 'flex';

    };

    const addChildMore = (el) => {

        dispatch(addChildToList(el))

    };

    const deleteChild = (el) => {

        dispatch(deleteChildAction(el));
        if (childList.length < 5) {
            document.getElementById('main-child-select').style.display = 'flex';
        }

    };

    const deleteRoom = (el) => {
        dispatch(deleteRoomAction(el))
    };

    const compactPeople = () => {
        let peopleSum = 0;
        roomListAdded.map((el) => {
            peopleSum += el.adultNum;
            peopleSum += el.children.length
        })
        setGuests(0);
        setGuests(peopleSum);
        localStorage.setItem("num_of_guests", peopleSum);
        dispatch(changePeopleDiv());

    };

    const searchHotel = () => {

        let myList =[];
        let childYears =[];
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

        console.log(myList);
        let num_of_adults =0;
        let num_of_childs =0;
        let child_years =[];
        myList.map((el)=>{
            num_of_adults += el.ad;
            num_of_childs += el.ch.length;
            el.ch.map((year)=>{
                child_years.push(year);
            })
        });

        localStorage.setItem('num_of_adults',num_of_adults);
        localStorage.setItem('num_of_childs',num_of_childs);
        localStorage.setItem('child_years',child_years);


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

     useEffect(()=>{
         dispatch(clearSearchResultAction());
         dispatch(clearRoomListAction());
     },[])



    return (
        <div className="booking" style={{display: isMenuShown ? 'none' : 'block'}}>
            <div className="container">
                <img className="booking__loading"
                     style={{display: isLoading ? 'block' : 'none'}} src={require('../images/loading.gif')}
                     alt="loading..."/>

                <h1 className="booking__title">{translate("Лучшее место")} <br
                    className="booking__break"/> {translate('для вашего отдыха')}</h1>
                <p className="booking__subtitle">{translate('Поиск отелей, хостелов и апартаментов на территории Средней Азии и стран СНГ')}
                </p>

                <form className="booking__form" style={{marginTop: isPeopleDivOpen ? '30px' : '68px'}}>

                    <div className="booking__el">
                        <img src={location} alt="location" className="booking__icon"/>
                        <div className="booking__dest-div">
                            <label htmlFor="" className="booking__label">{translate('Направление')}</label>
                            <input type="text" placeholder='Город или отель' className="booking__input"
                                   name="destination" value={search.destination}
                                   onChange={searchChangeHandler}/>
                        </div>
                    </div>

                    <div className="booking__el">
                        <img src={calendar} alt="location" className="booking__icon"/>
                        <div className="booking__date-div">
                            <label htmlFor="" className="booking__label">{translate('Заезд')}</label>
                            <input type="date" placeholder="22-10-2023" className="booking__input"
                                   name="check_in" onChange={searchChangeHandler}
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
                                // value='2022-05-01'
                                   onChange={searchChangeHandler}/>
                        </div>
                    </div>

                    <div className="booking__el">
                        <img src={person} alt="location" className="booking__icon"/>
                        <div className="booking__guest-div">
                            <label htmlFor="" className="booking__label">{translate('Гости')}</label>
                            <input type="text" placeholder="4 person" className="booking__input"
                                   value={guests}
                                   onClick={() => openPeopleDiv()}/>
                        </div>
                    </div>

                    <div className="booking__el">
                        <button className="booking__btn" type="button"
                                onClick={() => searchHotel()}>{translate('Поиск')}</button>
                    </div>

                </form>

                <p className="booking__empty-result">{searchEmptyResult}</p>
                {/*// добавление номеров*/}
                <div className="booking__people-forms"
                     style={{display: isPeopleDivOpen && roomList.length ? 'flex' : 'none'}}>
                    <div className="booking__people-add">
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
                                <select type="number"  id="main-child-select" placeholder="добавить ребенка"
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
                                <p >{translate('Взрослые')} : {el.adultNum}</p>
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


            </div>
        </div>
    );
};

export default Booking;