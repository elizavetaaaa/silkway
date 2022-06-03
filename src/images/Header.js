import React, {useEffect} from 'react';

import {Link, useNavigate} from 'react-router-dom'

import logo from "./logo.svg"
import {changeIsLogin, changeMenuStatus} from "../redux/reducer/visReducer";
import {useDispatch, useSelector} from "react-redux";
import {IoPersonCircle} from "react-icons/io5";
import {logoutUser} from "../redux/reducer/authReducer";

import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import translate from "../i18n/translate";
import {setLocale} from "../redux/reducer/lanReducer";
import {LOCALES} from "../i18n";

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isMenuShown = useSelector(state=>state.store.isMenuShown);

    const logout =()=>{
        let refresh = localStorage.getItem('REFRESH')
        let payload = {
            "refresh": refresh.slice(1, (refresh.length-1))
        };
        console.log(payload)
        dispatch(logoutUser(payload));
        localStorage.clear();
        window.location.replace('http://localhost:3000/');
    }
    useEffect(()=>{

    },[localStorage]);

    const goMyArea =()=>{
        navigate('/my-area');
    };

    const showSmallMenu  =()=>{
        dispatch(changeMenuStatus());
        document.getElementById('small-menu').style.display ='flex';
    };

    const locale = useSelector(state => state.lanReducer.locale);

    const languageHandler = (e) => {
        if (e.target.value === 'RU') {
            localStorage.setItem('lan', 'ru');
            document.getElementById('lang-small').value = 'RU';
            dispatch(setLocale(LOCALES.RUSSIAN))
        } else {
            localStorage.setItem('lan', 'en');
            document.getElementById('lang-small').value = 'ENG';

            dispatch(setLocale(LOCALES.ENGLISH))

        }

    };

    const setCurrency =(value)=>{
        localStorage.setItem('currency', value)
    }


    return (
        <div className="header">
            <div className="container">
            <nav className="header__nav">
                <img src={logo} alt="logo" className="header__logo"/>

                <ul className="header__ul">
                    <li><Link  className="header__li" to='/' >{translate('Главная')}</Link></li>
                    <li><a className="header__li" href="#"> {translate('О нас')}</a></li>
                    <li><Link className="header__li" to='/news' >{translate('Новости')}</Link></li>
                    <li><a className="header__li" href="/patners">{translate('Партнерам')}</a></li>

                </ul>
                <div className="header__left-div">
                    <select className="header__select" name="lang" id="lang"
                    onChange={(e)=>languageHandler(e)}>
                        <option value="RU">RU</option>
                        <option value="ENG">ENG</option>
                    </select>

                    <select  className="header__select" name="cur" id="cur"
                    onChange={(e)=>setCurrency(e.target.value)} >
                        <option value="USD">USD</option>
                        <option value="KGS">KGS</option>
                        <option value="RUB">RUB</option>
                        <option value="EURO">EURO</option>
                    </select>

                    <button className="header__my-area"
                            style={{display : localStorage.getItem('USER') ? 'block' : 'none'}}
                            onClick={()=>goMyArea()}
                    >
                        <IoPersonCircle className="header__my-area-icon"/>
                    </button>

                    <button className="header__login-btn"
                            style={{display : localStorage.getItem('USER') ? 'none' : 'block'}}
                            onClick={()=>dispatch(changeIsLogin())}>{translate('Войти')}</button>

                    <button className="header__login-btn"
                            style={{display : localStorage.getItem('USER') ? 'block' : 'none'}}
                            onClick={()=>logout()}>{translate('Выйти')}</button>



                </div>


                <button className="header__burger-btn" onClick={()=>showSmallMenu()}>{!isMenuShown ? <AiOutlineMenu className="header__burger-icon"/> :
                <AiOutlineClose className="header__burger-icon"/>}</button>

            </nav>


            </div>

        </div>
    );
};

export default Header;