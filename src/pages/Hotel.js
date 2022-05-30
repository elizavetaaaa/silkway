import React from 'react';
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
import {sendBooking} from "../redux/reducer/SearchReducer";


const Hotel = () => {
    const dispatch = useDispatch();
    const currentHotel = useSelector(state => state.searchReducer.chosenHotel);
    let lan = localStorage.getItem('lan');

    const bookHotel = (room) => {
        console.log(room);
        let booking = {
            guest_id: {
                email: localStorage.getItem('USER'),
                // role: ???;
                token: localStorage.getItem('ACCESS')
            },
            checkin_date: localStorage.getItem("check_in"),
            checkout_date: localStorage.getItem("check_out"),
            hotel: {
                hotel_name_ru: currentHotel?.hotel_name_ru,
                hotel_name_en: currentHotel?.hotel_name_en,
                hotel_address_ru: currentHotel?.hotel_address_ru,
                hotel_address_en: currentHotel?.hotel_address_en,
                hotel_description_ru: currentHotel?.hotel_description_ru,
                hotel_description_en: currentHotel?.hotel_description_en,
                is_active: true,
                city: {
                    city_name_ru: currentHotel?.city?.city_name_ru,
                    city_name_en: currentHotel?.city?.city_name_en,
                    country_id: {
                        country_name_ru: currentHotel?.country_id?.country_name_ru,
                        country_name_en: currentHotel?.country_id?.country_name_en,
                    }
                },
                checkin_date: localStorage.getItem("check_in"),
                checkout_date: localStorage.getItem("check_out"),
            },
            room: {
                room_name_ru: room.room_name_ru,
                room_name_en: room.room_name_en,
                room_description_ru: room.room_description_ru,
                room_description_en: room.room_description_en,
                child_capacity: room.child_capacity
            },
            num_of_guest: 0
        };
        dispatch(sendBooking(booking));
        console.log(JSON.stringify(booking));
        console.log(room);

    };

    return (
        <div className="hotel">
            <div className="container">
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
                    <p className="hotel__address">{lan === 'ru' ? currentHotel?.hotel_address_ru : currentHotel.hotel_address_en}</p>
                    <p className="hotel__description">
                        {lan === 'ru' ? currentHotel?.hotel_description_ru : currentHotel?.hotel_description_en}
                    </p>
                </div>

                <div className="hotel__container hotel__container-fac">

                    {currentHotel?.images.length ?
                        <Carousel className="hotel__carousel" itemsToShow={3} pagination={true}
                                  style={{position: 'relative', width: '60%', padding: '0 !important'}}>
                            {currentHotel?.images?.map((el) => {
                                return <img className="hotel__img"
                                            src={`https://silk-travel.herokuapp.com${el.image_url}`} alt="image"/>

                            })}

                        </Carousel> : ''

                    }


                </div>
                <div className="hotel__container hotel__container-fac">


                    <div className="hotel__facilities">
                        <h3 className="hotel__subtitle">{translate('Удобства отеля')}</h3>
                        {
                            currentHotel?.category_id.map((el) => {
                                return <div className="hotel__facility">
                                    <AiFillCheckCircle
                                        className="hotel__room-icon"/> {lan === 'ru' ? el.hotel_category_name_ru : el.hotel_category_name_en}
                                </div>

                            })}
                    </div>

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

                <div className="hotel__container">
                    <h3 className="hotel__subtitle">Номера</h3>


                    {currentHotel?.room_id?.map((room) => {
                        return <div className="hotel__room-div">
                            <h3 className="hotel__room-title">{lan === 'ru' ? room.room_name_ru : room.room_name_en}</h3>
                            <p className="hotel__price">{translate('Цена')} - {room?.price[0].price}</p>
                            <p>{lan === 'ru' ? room.room_description_ru : room.room_description_en}</p>


                            <div className="hotel__room-fac-div">
                                <div className="hotel__room-fac"
                                     style={{display: room?.category_id.length ? 'block' : 'none'}}>
                                    <h3 className="hotel__room-subtitle">{translate('Удобства комнаты')}</h3>
                                    {room?.category_id.map((category) => {
                                        return <p><BsCheckAll
                                            className="hotel__room-icon"/>{lan === 'ru' ? category.room_category_name_ru : category.room_category_name_en}
                                        </p>
                                    })}
                                </div>

                                <div className="hotel__room-fac"
                                     style={{display: room?.characteristics_id?.length ? 'block' : 'none'}}>
                                    <h3 className="hotel__room-subtitle">{translate('Дополнительное описание')}</h3>
                                    {room?.characteristics_id.map((category) => {
                                        return <p><BsFillCaretRightFill
                                            className="hotel__room-icon"/>{lan === 'ru' ? category.name_ru : category.name_en}
                                        </p>
                                    })}
                                </div>

                                <button className="hotel__book-btn"
                                        onClick={() => bookHotel(room)}>{translate('Забронировать')}</button>
                            </div>


                        </div>
                    })}


                </div>


            </div>

        </div>
    );
};

export default Hotel;


