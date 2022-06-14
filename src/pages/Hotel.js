import React, {useEffect, useState} from 'react';
import {AiFillCheckCircle} from "react-icons/ai";
import {FaBabyCarriage} from "react-icons/fa";
import Carousel from "react-elastic-carousel";
import {useDispatch, useSelector} from "react-redux";
import star1 from "../icons/1star.svg";
import star2 from "../icons/2star.svg";
import star3 from "../icons/3star.svg";
import star4 from "../icons/4star.svg";
import star5 from "../icons/5star.svg";
import {GiHotMeal} from "react-icons/gi";
import translate from "../i18n/translate";
import {BsCheckAll} from "react-icons/bs";
import {BsFillCaretRightFill} from "react-icons/bs";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import {
    closeBookSuccessAction,
    closePhonePopupAction,
    openPhonePopupAction,
    sendBooking
} from "../redux/reducer/SearchReducer";


const Hotel = () => {
    const dispatch = useDispatch();
    const currentHotel = useSelector(state => state.searchReducer.chosenHotel);
    const phonePopupStatus = useSelector(state => state.searchReducer.phonePopupStatus);
    const bookSuccessPopupStatus = useSelector(state => state.searchReducer.bookSuccessPopupStatus);
    let lan = localStorage.getItem('lan');


    useEffect(()=>{
        console.log(currentHotel)
    },[]);

    const [booking, setBooking] = useState({});
    const bookHotel = (value) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        let newBooking ={
            room: [value.id],
            hotel : currentHotel.id,
            checkin_date: localStorage.getItem("check_in"),
            checkout_date: localStorage.getItem("check_out"),
            num_of_guest: localStorage.getItem("num_of_guests"),
            room_price : Math.round(value?.totat_price),
            phone_number: "+996550406402",
            child_years : [localStorage.getItem('child_years')],
            num_of_adults: localStorage.getItem('num_of_adults'),
            num_of_childs: localStorage.getItem('num_of_childs'),
        };
        setBooking(newBooking);
        dispatch(openPhonePopupAction());


    };
    const [phone, setPhone] = '';
    // useEffect(()=>{
    //     console.log(phone)
    // },[phone])
    const phoneHandler =(phone)=>{
        console.log(phone.e);
        booking.phone_number = phone;

        // setPhone(phone.e)
    };



    const bookRoom =()=>{
        booking.phone_number = phone;
        console.log("RESULT" + JSON.stringify(booking))
         dispatch(sendBooking(booking))
    };

    const closePopup =()=>{
        dispatch(closePhonePopupAction());

    };

    const closeSuccessPopup =()=>{
        dispatch(closeBookSuccessAction())
    }
    return (
        <div className="hotel">
            <div className="hotel__phone-popup" style={{display: phonePopupStatus ? 'block' : 'none'}}>
                <button onClick={()=>closePopup()}
                        className="hotel__close-popup-btn">х</button>
                <p className="hotel__phone-popup-text">{translate('Для отправки запроса на бронирование, пожалуйста, введите Ваш номер телефона')}</p>
                <PhoneInput
                    className="hotel__phone-popup-input"
                    country={'kg'}
                    value={phone}
                    style={{width: '100%'}}
                    onChange={(e) => phoneHandler({ e })}
                />
                <button className="hotel__phone-popup-btn" onClick={()=>bookRoom()}>отправить</button>
            </div>
            <div className="hotel__phone-popup" style={{display : bookSuccessPopupStatus ? 'block' : 'none' }}>
                <p className="hotel__thanks-msg">Благодарим за использование Silk Way Travel!</p>
                <p className="hotel__phone-popup-subtext">{translate('Ваш запрос успешно отправлен и будет рассмотрен в близжайшее время. После чего с Вами свяжутся нашими менеджеры ')}</p>
                <button onClick={()=>closeSuccessPopup()} className="hotel__phone-popup-btn">ok</button>

            </div>
            <div className="container hotel__content"
            style={{opacity : phonePopupStatus || bookSuccessPopupStatus ? '30%' : '100%'}}>

                <div className="hotel__container">
                    <h3 className="hotel__title">{lan === 'ru' ? currentHotel?.hotel_name_ru : currentHotel?.hotel_name_en}</h3>
                    <img alt="raiting..." className="hotelCard__raiting"
                         src={currentHotel?.hotel_category[0]?.hotel_category_stars === 1 ?
                             star1 :
                             currentHotel?.hotel_category[0]?.hotel_category_stars === 2 ?
                                 star2 :
                                 currentHotel?.hotel_category[0]?.hotel_category_stars === 3 ?
                                     star3 :
                                     currentHotel?.hotel_category[0]?.hotel_category_stars === 4 ?
                                         star4 :
                                         currentHotel?.hotel_category[0]?.hotel_category_stars === 5 ?
                                             star5 : ''}/>

                                             <p className="hotel__time">{translate('Время регистрации')} : {currentHotel.checkin_date} - {currentHotel.checkout_date} </p>
                    <p className="hotel__address">{lan === 'ru' ? currentHotel?.hotel_address_ru : currentHotel.hotel_address_en}</p>
                    <p className="hotel__description">
                        {lan === 'ru' ? currentHotel?.hotel_description_ru : currentHotel?.hotel_description_en}
                    </p>
                </div>

                <div className="hotel__container hotel__container-fac">

                    {currentHotel?.images.length ?
                        <Carousel className="hotel__carousel" itemsToShow={5} pagination={true}
                                  style={{position: 'relative', width: '100%', padding: '0 !important'}}>
                            {currentHotel?.images?.map((el) => {
                                return <img className="hotel__img"
                                            src={`https://silk-travel.herokuapp.com${el.image_url}`} alt="image"/>

                            })}

                        </Carousel> : ''

                    }


                </div>
                <h3 className="hotel__subtitle">{translate('Удобства отеля')}</h3>

                <div className="hotel__facilities hotel__hotel-list-facilities">
                    {
                        currentHotel?.facilities_hotel_id?.map((el) => {
                            return <div className="hotel__facility">
                                <AiFillCheckCircle
                                    className="hotel__room-icon"/> {lan === 'ru' ? el.hotel_category_name_ru : el.hotel_category_name_en}
                            </div>

                        })}
                </div>
                <hr/>
                <div className="hotel__container hotel__container-fac">
                    <div className="hotel__facilities">
                        <h3 className="hotel__subtitle">{translate('Для детей')}</h3>
                        {
                            currentHotel?.child_service_id.map((el) => {
                                return <div className="hotel__facility">
                                    <FaBabyCarriage
                                        className="hotel__room-icon"/> {lan === 'ru' ? el.name_ru : el.name_en}</div>

                            })}
                    </div>

                    <div className="hotel__facilities">
                        <h3 className="hotel__subtitle">{translate('Питание')}</h3>
                        {currentHotel?.food_category.map((el) => {
                            return <div className="hotel__facility">
                                <GiHotMeal
                                    className="hotel__room-icon"/>{lan === 'ru' ? el.food_category_name_ru : el.food_category_name_en}
                            </div>

                        })}
                    </div>

                    {/*<div className="hotel__facilities">*/}
                    {/*    <h3 className="hotel__subtitle">Ознакомьтесь с отзывами об отеле</h3>*/}
                    {/*    <button className="hotel__comment-btn">Читать все отзывы</button>*/}

                    {/*</div>*/}

                </div>
                <hr/>

                <div className="hotel__container">
                    <h3 className="hotel__subtitle">Номера</h3>
                    {currentHotel?.result?.rooms?.map((el)=>{
                        return <div className="hotel__room-div">
                            <h3 className="hotel__room-title">{currentHotel?.result?.amount_of_room} х {lan === 'RU' ? el.room_name_ru : el.room_name_en}</h3>
                            <p className="hotel__price">{translate('Цена')} - {Math.round(el?.totat_price)} {localStorage.getItem('currency')}</p>
                                    <p>{lan === 'ru' ? el.room_description_ru : el.room_description_en}</p>

                            <h3 className="hotel__room-subtitle"
                                style={{display: el?.category_id.length ? 'flex' : 'none'}}>{translate('Удобства комнаты')}</h3>

                            <div className="hotel__room-list-facilities"
                                 style={{display: el?.category_id.length ? 'flex' : 'none'}}>
                                {el?.category_id.map((category) => {

                                    return <div className="hotel__hotel-fac-div" >
                                        {/*<BsCheckAll className="hotel__room-icon"/>*/}
                                        <p>{lan === 'ru' ? category.room_category_name_ru : category.room_category_name_en}
                                        </p>
                                    </div>
                                })}
                            </div>
                                    <div>
                                        <div className="hotel__room-fac"
                                             style={{display: el?.characteristics_id?.length ? 'block' : 'none'}}>
                                            <h3 className="hotel__room-subtitle">{translate('Дополнительное описание')}</h3>
                                            {el?.characteristics_id.map((category) => {
                                                return <p><BsFillCaretRightFill
                                                    className="hotel__room-icon"/>{lan === 'ru' ? category.name_ru : category.name_en}
                                                </p>
                                            })}
                                        </div>



                                    </div>

                            <button className="hotel__book-btn"
                                    onClick={() => bookHotel(el)}>{translate('Забронировать')}</button>

                        </div>})}
                    {/*{Object.entries(currentHotel?.result).map(([key, value]) => {*/}
                    {/*    return <div className="hotel__room-div">*/}
                    {/*        <h3 className="hotel__room-title">{lan === 'ru' ? value?.room_name_ru : value.room_name_en}</h3>*/}
                    {/*        <p className="hotel__price">{translate('Цена')} - {value?.prices[0].price}</p>*/}
                    {/*        <p>{lan === 'ru' ? value.room_description_ru : value.room_description_en}</p>*/}
                    {/*        <div className="hotel__room-fac-div">*/}
                    {/*            <div className="hotel__room-fac"*/}
                    {/*                 style={{display: value?.category_id.length ? 'block' : 'none'}}>*/}
                    {/*                <h3 className="hotel__room-subtitle">{translate('Удобства комнаты')}</h3>*/}
                    {/*                {value?.category_id.map((category) => {*/}
                    {/*                    return <p><BsCheckAll*/}
                    {/*                        className="hotel__room-icon"/>{lan === 'ru' ? category.room_category_name_ru : category.room_category_name_en}*/}
                    {/*                    </p>*/}
                    {/*                })}*/}
                    {/*            </div>*/}

                    {/*            <div className="hotel__room-fac"*/}
                    {/*                 style={{display: value?.characteristics_id?.length ? 'block' : 'none'}}>*/}
                    {/*                <h3 className="hotel__room-subtitle">{translate('Дополнительное описание')}</h3>*/}
                    {/*                {value?.characteristics_id.map((category) => {*/}
                    {/*                    return <p><BsFillCaretRightFill*/}
                    {/*                        className="hotel__room-icon"/>{lan === 'ru' ? category.name_ru : category.name_en}*/}
                    {/*                    </p>*/}
                    {/*                })}*/}
                    {/*            </div>*/}

                    {/*            <button className="hotel__book-btn"*/}
                    {/*                    onClick={() => bookHotel(value)}>{translate('Забронировать')}</button>*/}
                    {/*        </div>*/}


                    {/*    </div>*/}
                    {/*})*/}
                    {/*}*/}





                </div>


            </div>

        </div>
    );
};

export default Hotel;


