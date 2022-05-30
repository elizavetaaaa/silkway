import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { BsChevronCompactLeft } from "react-icons/bs";
import {makeResPassFalse} from "../redux/reducer/visReducer";
import translate from "../i18n/translate";
import {resetPassword} from "../redux/reducer/authReducer";

const RemindPass = () => {

    const [email, setEmail] = useState('');


    const showResPass = useSelector(state => state.store.showResPass);
    const dispatch = useDispatch();

    const resPassword =()=>{
        console.log(email);
        dispatch(resetPassword(email));
    };

    return (
        <div className="resetPass" style={{display: showResPass ? 'block' : 'none'}}>
            <div className="resetPass__top-div">
                <button className="resetPass__back-btn" onClick={()=>dispatch(makeResPassFalse())}><BsChevronCompactLeft size={26}/></button>
                <h3 className="resetPass__title">{translate('Сбросить пароль')}</h3>

            </div>
            <p className="resetPass__subtitle">{translate('Введите Ваш e-mail и мы пришлем Вам ссылку для восстановления пароля')} </p>
            <input type="text" placeholder="example@gmail.com" className="resetPass__input login__fi"
            value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <br/>
            <button className="resetPass__remind-btn"
            onClick={()=>resPassword()}>{translate('Сбросить пароль')}</button>
            <br/>

        </div>
    );
};

export default RemindPass;