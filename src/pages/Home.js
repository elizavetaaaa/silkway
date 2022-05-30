import React, {useEffect} from 'react';
import Booking from "../components/Booking";
import BestHotels from "../components/BestHotels";
import Facilities from "../components/Facilities";
import Map from "../components/Map";
import Login from "../components/Login";
import RemindPass from "../components/RemindPass";
import {useDispatch, useSelector} from "react-redux";
import {setLocale} from "../redux/reducer/lanReducer";
import {LOCALES} from "../i18n";

const Home = () => {
    const isMenuShown = useSelector(state=>state.store.isMenuShown);
    const loading = useSelector(state => state.registration.loading);
    const locale = useSelector(state => state.lanReducer.locale);
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
        <div >
            <Booking/>
            <Login/>
            <RemindPass/>
            <BestHotels/>
            <Facilities/>
            {/*<Map/>*/}


        </div>
    );
};

export default Home;