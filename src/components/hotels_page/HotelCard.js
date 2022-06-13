import React from 'react';
import hotel from '../../images/hotel.png'
import star1 from '../../icons/1star.svg'
import star2 from '../../icons/2star.svg'
import star3 from '../../icons/3star.svg'
import star4 from '../../icons/4star.svg'
import star5 from '../../icons/5star.svg'
import Carousel from 'react-elastic-carousel'
import Item from 'react-elastic-carousel'
import {setChosenHotel} from "../../redux/reducer/SearchReducer";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {changeIsLogin} from "../../redux/reducer/visReducer";

const HotelCard = ({props}) => {

    let items = [
        {id: 1, title: 'https://s7d2.scene7.com/is/image/ritzcarlton/pnrqz-king-50661983?$XlargeViewport100pct$'},
        {id: 2, title: 'https://exp.cdn-hotels.com/hotels/1000000/980000/978600/978591/e73d0c91_y.jpg?impolicy=fcrop&w=500&h=333&q=high'},
        // {id: 3, title: 'https://www.getyourvenue.com/uploads/venue-images/2188/1subvenue.jpg'},
        // {id: 4, title: 'item #4'},
        // {id: 5, title: 'item #5'}
    ];
    let lan = localStorage.getItem('lan');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const redirectHotel =(props)=>{
        dispatch(setChosenHotel(props));
        navigate('/hotel')
    };

    const openLogin =()=>{
        dispatch(changeIsLogin());
        window.scrollTo(0, 0);
    }



    return (
        <div className="hotelCard">
            <div className="hotelCard__top-div">
            <Carousel className="hotel__carousel" itemsToShow={1} pagination ={false} style={{position : 'relative', width: '50%', padding: '0 !important' }}>
                {items.map(item =>
                    <div className='hotelCard__img-div'
                    key={item.id}>
                        <img src={item.title} alt="room" className="hotelCard__img"/>
                    </div>)}
            </Carousel>

            <div className="hotelCard__text-content">
                <div className="hotelCard__name-star">
                    <h4 className="hotelCard__title">{lan === 'ru' ? props?.hotel_name_ru : props?.hotel_name_en }</h4>
                    <img src={props?.hotel_category[0]?.hotel_category_stars === 1 ?
                            star1 :
                            props?.hotel_category[0]?.hotel_category_stars === 2 ?
                    star2 :
                                props?.hotel_category[0]?.hotel_category_stars === 3 ?
                    star3 :
                                    props?.hotel_category[0]?.hotel_category_stars === 4 ?
                    star4:
                                        props?.hotel_category[0]?.hotel_category_stars === 5 ?
                    star5 : ''} alt="raiting..." className="hotelCard__raiting"/>

                </div>

                <p className="hotelCard__address">{lan === 'ru' ? props?.hotel_address_ru : props?.hotel_address_ru }</p>

                <p className='hotelCard__description'>{lan === 'ru' ? props?.hotel_description_ru?.slice(0, 120) : props?.hotel_description_en?.slice(0, 120)}... </p>

            </div>
            </div>

            <div className="hotelCard__bottom-sec">
                <div className="hotelCard__room-info">
                    <p>{props?.result?.amount_of_room} х  {lan === 'RU' ? props?.result?.rooms[0]?.room_name_ru : props?.result?.rooms[0]?.room_name_en}</p>
                    <span className="hotelCard__room-price">{Math.round(+props?.result?.rooms[0]?.totat_price)} {localStorage.getItem("currency")}</span>

                </div>
                <button className="hotelCard__more-btn" onClick={()=>
                    localStorage.getItem('ACCESS') ? redirectHotel(props) : openLogin()}>
                    {localStorage.getItem('ACCESS') ? 'Подробнее' : 'Login'}</button>
            </div>




        </div>
    );
};

export default HotelCard;