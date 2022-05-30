import React, {useState} from 'react';
import stars from '../../images/stars.png'
import Carousel from 'react-elastic-carousel'
import {useNavigate} from "react-router-dom";
import {FiRss} from "react-icons/fi";
import {AiFillCar} from "react-icons/ai";
import {FaBabyCarriage, FaSnowflake} from "react-icons/fa";

const FakeCard = () => {

    let items = [
        {id: 1, title: 'https://s7d2.scene7.com/is/image/ritzcarlton/pnrqz-king-50661983?$XlargeViewport100pct$'},
        {
            id: 2,
            title: 'https://exp.cdn-hotels.com/hotels/1000000/980000/978600/978591/e73d0c91_y.jpg?impolicy=fcrop&w=500&h=333&q=high'
        },
        // {id: 3, title: 'https://www.getyourvenue.com/uploads/venue-images/2188/1subvenue.jpg'},
        // {id: 4, title: 'item #4'},
        // {id: 5, title: 'item #5'}
    ];

    const navigate = useNavigate();
    const [load, setLoad] = useState(false)
    const redirectToHotel = () => {
        setLoad(true)
        setTimeout(() => {
            setLoad(false)
            navigate('/hotel')

        }, 300)
    }

    return (
        <div className="hotelCard">
            <img style={{display: load ? 'block' : 'none'}} className="hotelCard__load"
                 src={require("../../images/loading.gif")} alt=""/>
            <Carousel className="hotel__carousel" itemsToShow={1} pagination={false}
                      style={{position: 'relative', width: '50%', padding: '0 !important'}}>
                {/*{items.map(item =>*/}
                {/*    <div className='hotelCard__img-div'*/}
                {/*         key={item.id}>*/}
                {/*        <img src={item.title} alt="room" className="hotelCard__img"/>*/}
                {/*    </div>)}*/}
                <img src={require('../../images/novotel/novotel2.jpeg')} alt="room" className="hotelCard__img"/>
                <img src={require('../../images/novotel/novotel5.jpeg')} alt="room" className="hotelCard__img"/>
                <img src={require('../../images/novotel/novotel3.jpeg')} alt="room" className="hotelCard__img"/>

            </Carousel>
            <div className="hotelCard__text-content">
                <div className="hotelCard__name-star">
                    <h4 className="hotelCard__title">Novotel Almaty City</h4>
                    <img src={stars} alt="raiting..." className="hotelCard__raiting"/>
                </div>

                <p className="hotelCard__address">Пр-т Достык, д. 104 A АЛМА-АТА КАЗАХСТАН</p>

                <p className='hotelCard__description'>Novotel Алматы Сити Центр идеально подходит для деловых людей и
                    туристов. Отель в центре города Алматы на....</p>


                <div className="hotelCard__card-facilities">
                    {/*<h3 className="hotel__subtitle">Главные удобства отеля</h3>*/}
                    <br/>
                    <div className="hotelCard__facility"><FiRss/></div>
                    <div className="hotelCard__facility"><AiFillCar/></div>
                    <div className="hotelCard__facility"><FaBabyCarriage/></div>
                    <div className="hotelCard__facility"><FaSnowflake/></div>
                    {/*<a href="" className="hotel__link">Какие еще есть удобства?</a>*/}
                </div>
                <div className="hotelCard__bottom-sec">
                    <button className="hotelCard__more-btn" onClick={() => redirectToHotel()}>Подробнее</button>
                </div>
            </div>

        </div>
    );
};

export default FakeCard;