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
    removeSelectedRoom,
    setLoadingTrue,
    showPeopleDiv
} from "../redux/reducer/visReducer";
import {searchPlaceRequest} from "../redux/reducer/SearchReducer";
import {useNavigate} from "react-router-dom";

const Booking = () => {
    const isMenuShown = useSelector(state => state.store.isMenuShown);
    const isPeopleDivOpen = useSelector(state => state.store.isPeopleDivOpen);
    const roomList = useSelector(state => state.store.roomList);
    const searchResult = useSelector(state => state.searchReducer.searchResult);
    const searchEmptyResult = useSelector(state => state.searchReducer.searchEmptyResult);
    const isLoading = useSelector(state => state.store.isLoading);

    const destination = translate('Город или отель');
    const dispatch = useDispatch();

    const openPeopleDiv = () => {
        dispatch(showPeopleDiv());
        dispatch(addRoom());
    };
    const addPeople = () => {
        dispatch(changePeopleDiv());
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
    console.log(yourDate)
    let check_in_day = yourDate.toISOString().split('T')[0];



    let tomorrow =  new Date()
    tomorrow.setDate(yourDate.getDate() + 1);
    console.log(tomorrow);
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
    useEffect(() => {
        console.log(search.destination)
        console.log(search.check_in)
        console.log(search.check_out)
    }, [search]);

    const navigate = useNavigate();


    const searchHotel = () => {
        // let payload = `${search.destination} ${search.check_in} ${search.check_out}`;
        let payload = search.destination;
        localStorage.setItem('check_in', search.check_in);
        localStorage.setItem('check_out', search.check_out);
        console.log(payload);
        dispatch(setLoadingTrue());
        dispatch(searchPlaceRequest(payload));
        setTimeout(()=>{
            navigate ('/hotels');

        },700)
    };

    const removeRoom = (id) => {
        dispatch(removeSelectedRoom(id))
    };


            return (
                <div className="booking" style={{display: isMenuShown ? 'none' : 'block'}}>
                    <div className="container">
                        <img className="booking__loading"
                             style={{display : isLoading ? 'block' : 'none'}} src={require('../images/loading.gif')} alt="loading..."/>

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
                                           // value='2022-04-30'
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
                                           value={2}
                                           onClick={() => openPeopleDiv()}/>
                                </div>
                            </div>

                            <div className="booking__el">
                                <button className="booking__btn" type="button"
                                        onClick={() => searchHotel()}>{translate('Поиск')}</button>
                            </div>

                        </form>

                        <p className="booking__empty-result">{searchEmptyResult}</p>
                        <div className="booking__people-forms"
                             style={{display: isPeopleDivOpen && roomList.length ? 'flex' : 'none'}}>
                            {roomList.map((el, idx) => {
                                if (el) {
                                    return <div className="booking__people-add" id={el} key={el}>
                                        <div className="booking__room-top">
                                            <h4 className="booking__room-title">{translate("Номер")} {idx + 1}</h4>
                                            <button className="booking__remove-room-btn"
                                                    onClick={() => removeRoom(el)}>{translate("Удалить")}</button>
                                        </div>

                                        <div className="booking__inputs-div">
                                            <div className="booking__people-input-div">
                                                <label htmlFor=""
                                                       className="booking__label booking__people-label">{translate('Взрослые')}</label>
                                                <input type="number" min="1" max="9" placeholder=""
                                                       className="booking__people-input"
                                                       name="adults"
                                                       // value={people.adults}
                                                       value={2}
                                                       onChange={changePeopleHandler}/>
                                            </div>

                                            <div className="booking__people-input-div">
                                                <label htmlFor=""
                                                       className="booking__label booking__people-label">{translate('Дети')}</label>
                                                <input type="number" min="1" max="9" placeholder=""
                                                       className="booking__people-input"
                                                       name="children" value={people.children}
                                                       onChange={changePeopleHandler}/>

                                            </div>
                                        </div>

                                        <div className="booking__room-btns">
                                            <button className="booking__add-room--btn"
                                                    style={{display: idx !== roomList.length - 1 ? 'none' : 'block'}}
                                                    onClick={() => dispatch(addRoom())}>+ {translate("Добавить еще")}<br></br>{translate("номер")}
                                            </button>

                                            <button className="booking__room-ready-btn"
                                                    onClick={() => addPeople()}>{translate('Готово')}</button>
                                        </div>

                                    </div>
                                }
                            })}


                        </div>


                    </div>
                </div>
            );
};

export default Booking;