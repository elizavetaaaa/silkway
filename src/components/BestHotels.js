import React from 'react';
import Card from "./Card";
import {useSelector} from "react-redux";
import translate from "../i18n/translate";
import novotel from "../images/hotels/novotel.jpg";
import sheraton from "../images/hotels/sheraton.jpg";
import hyatt from "../images/hotels/hyatt.jpg";

const BestHotels = () => {
    const isMenuShown = useSelector(state=>state.store.isMenuShown);

    return (
        <div className="besthotels" style={{display : isMenuShown ? 'none' : 'block'}}>
            <div className="container">

                <h3 className="besthotels__title">{translate('Популярные отели')}</h3>

                <div className="besthotels__under-title-content">
                    <p className="besthotels__subtitle" style={{width : '85%'}}>Каким должен быть отель для того, чтобы бизнесмены, планирующие деловые мероприятия, встречи или просто собираясь в командировку, остановились именно в нем? Экспертное мнение на этот счет таково: бизнес-отель должен быть строгим, оборудованным по последнему слову техники и иметь в своем распоряжении бизнес-центр и спектр соответствующих статусу услуг. Мы представляем вашему вниманию наш рейтинг, который мы решили составить в преддверии командировочного сезона.</p>
                    <button className="besthotels__view-btn">{translate('Смотреть все')}</button>

                </div>
                <div className="besthotels__cards">
                    {/*<Card/>*/}
                    {/*<Card/>*/}
                    {/*<Card/>*/}


                    <div className="card">
                        <img src={novotel} alt="hotel" className="card__img"/>
                        <p className="card__location">Almaty Kazahstan</p>
                        <h4 className="card__hotel-name">Novotel</h4>
                        <div className="card__extra">
                            <p className="card__price" style={{marginRight: '20px'}}>$ 300 per night</p>
                            <div className="card__raiting">5.1</div>
                        </div>

                    </div>

                    <div className="card">
                        <img src={sheraton} alt="hotel"
                             style={{height: '200px'}} className="card__img"/>
                        <p className="card__location">Bishkek Kyrgyzstan</p>
                        <h4 className="card__hotel-name">Sheraton</h4>
                        <div className="card__extra">
                            <p className="card__price" style={{marginRight: '20px'}}>$ 300 per night</p>
                            <div className="card__raiting">5.1</div>
                        </div>

                    </div>

                    <div className="card">
                        <img src={hyatt} alt="hotel" className="card__img"/>
                        <p className="card__location">Tashkent Uzbekistann</p>
                        <h4 className="card__hotel-name">Hyatt Tashkent</h4>
                        <div className="card__extra">
                            <p className="card__price" style={{marginRight: '20px'}}>$ 300 per night</p>
                            <div className="card__raiting">5.1</div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default BestHotels;