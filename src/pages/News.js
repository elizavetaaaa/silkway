import React, {useEffect} from 'react';
import Login from "../components/Login";
import RemindPass from "../components/RemindPass";
import {useDispatch, useSelector} from "react-redux";
import {setLocale} from "../redux/reducer/lanReducer";
import {LOCALES} from "../i18n";

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
            news page
        </div>
    );
};

export default News;