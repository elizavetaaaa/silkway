import React, {useEffect, useState} from 'react';
import asia from "../images/icons/asia.png";
import mountain from "../images/icons/mountain.png";
import car from "../images/icons/car-key.png";
import conference from "../images/icons/conference.png";
import {useDispatch, useSelector} from "react-redux";
import translate from "../i18n/translate";
import {changeContactDiv, showContactDiv} from "../redux/reducer/visReducer";
import {setLocale} from "../redux/reducer/lanReducer";
import {LOCALES} from "../i18n";
import {closeMsgSuccessAction, sendMsgAction} from "../redux/reducer/SearchReducer";

const Facilities = () => {
    const isMenuShown = useSelector(state => state.store.isMenuShown);
    const isContactOpen = useSelector(state => state.store.isContactOpen);
    const msgPopup = useSelector(state => state.searchReducer.msgPopup);
    const dispatch = useDispatch();


    const openContact = () => {
        dispatch(showContactDiv());
    };

    const closeContact =()=>{
        dispatch(changeContactDiv());
    };



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

    }, []);

    const sendMessage =()=>{
        if(letter.email !== '' && letter.message !==''){
            dispatch(sendMsgAction(letter))

        }
        // dispatch(changeContactDiv());
    };

    const [letter, setLetter] =useState({
        email:'',
        message:''
    });

    const changeHandler = (e) => {
        setLetter((pref) => {
            return {
                ...pref, [e.target.name]: e.target.value
            }
        })
    };

    const closeMsgInfo =()=>{
       dispatch( closeMsgSuccessAction());
    }


    return (
        <div className="facilities" style={{display: isMenuShown ? 'none' : 'block'}}>
            <div className="facilities__contact-form"
                 style={{display : isContactOpen ? 'block' : 'none'}}>
                <button className="facilities__close-btn"  type="button" onClick={()=>closeContact()}>Х</button>
                <div className="facilities__input-block">
                    <label className="facilities__label">{translate('Еmail')}</label>
                    <input required type="text" className="facilities__input" value={letter.email}
                           name={'email'}

                           placeholder="Введите Ваш email"
                           onChange ={changeHandler}/>
                </div>

                <div className="facilities__input-block">
                    <label className="facilities__label">{translate('Cообщение')} </label>
                    <textarea required className="facilities__text-area" value={letter.message}
                              name={'message'}
                              placeholder="Введите Вашe сообщение"
                              onChange ={changeHandler}/>
                </div>

                <button className="facilities__submit-btn" type="button" onClick={()=>sendMessage()}>{translate('Отправить')}</button>
            </div>

            <div className="facilities__msg-info facilities__contact-form"
            style={{display : msgPopup ? 'block' : 'none'}}>

                <h3>Сообщение успешно отправлено!</h3><br/>
                <p>В близжайшее время наш менеджер свяжется с Вами!</p>
                <button className="facilities__submit-btn facilities__msg-btn" onClick={()=>closeMsgInfo()}>OK</button>

            </div>
            <div className="container facilities__subcontainer" style={{opacity : isContactOpen || msgPopup ? '30%' : '100%'}}>



                <div className="facilities__tex-div">
                    <h3 className="facilities__title">
                        {translate('Мы делаем все возможное, чтобы предоставить вам хорошие условия')}                </h3>
                    <p className="facilities__subtitle">{translate('Рады приветствовать вас на сайте компании Silkway travel! Ознакомьтесь с предоставляемымии нами услугами или свяжитесь с нами, заполнив форму.')} </p>

                    <button className="facilities__contact-btn"
                            type="button"
                            onClick={() => openContact()}>{translate('Свяжитесь с нами')}</button>
                </div>
                <div className="facilities__fac-div">
                    <div className="facilities__facility">
                        <img src={asia} alt="asia" className="facilities__icon"/>

                        <p>{translate('Бронирование отелей в странах Азии')}</p></div>
                    <div className="facilities__facility">
                        <img src={mountain} alt="asia" className="facilities__icon"/>

                        <p>{translate('Бронирование отелей в странах Кавказа')}</p>
                    </div>
                    <div className="facilities__facility">
                        <img src={car} alt="asia" className="facilities__icon"/>

                        <p>{translate('Заказ автомобиля (любой категории) с водителем')}</p>
                    </div>
                    <div className="facilities__facility">
                        <img src={conference} alt="asia" className="facilities__icon"/>

                        <p>{translate('Организация конференц-сервиса (MICE)')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Facilities;