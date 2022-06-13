import React, {useEffect} from 'react';
import Login from "../components/Login";
import RemindPass from "../components/RemindPass";
import {useDispatch, useSelector} from "react-redux";
import {setLocale} from "../redux/reducer/lanReducer";
import {LOCALES} from "../i18n";
import Footer from "../components/Footer";

const News = () =>{
    const isMenuShown = useSelector(state=>state.store.isMenuShown);
    const dispatch = useDispatch();
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
    return (
        <div className="news" style={{display : isMenuShown ? 'none' : 'block'}}>
            <Login/>
            <RemindPass/>
            <div className="news__news-block">
                <div className="news__new">
                    <div className="news__new-half">
                        <h2 className="news__title"> Добро пожаловать на наш сайт!</h2>
                        <p>Дорогие клиенты компании Silkway Travel ! <br/> <br/>Рады сообщить вам о запуске новой  платформы онлайн бронирования "Silk Way Travel". Теперь у вас есть возможность
                            воспользоваться нашими услугами в более удобном, быстром и надежном формате,
                           бронивать отели на территории Кыргызстана и постсоветских стран. <br/><br/>

                           С нетерпением ждем старых и новых клиентов!
                             </p>
                    </div>

                    <div className="news__new-half">
                        <img src={require("../images/hotels/welcome.jpg")} alt="welcome silkway"/>
                    </div>

                    </div>
            </div>

        </div>
    );
};

export default News;