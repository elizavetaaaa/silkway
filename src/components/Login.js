import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import RemindPass from "./RemindPass";
import {changeIsLogin, changeIsResPass, setLoginToFalse, setMenuStatus} from "../redux/reducer/visReducer";
import {changeLoading, login} from '../redux/reducer/authReducer'
import translate from "../i18n/translate";

const Login = () => {
    const dispatch = useDispatch();


    const showLogin = useSelector(state => state.store.showLogin);
    const showResPass = useSelector(state => state.store.showResPass);
    const loading = useSelector(state => state.registration.loading);


    useEffect(()=>{
        dispatch(setLoginToFalse());
    },[]);

    const [data, setData] = useState({
        email: '',
        password: ''
    });

    const changeHandler = (e) => {
        setData((pref) => {
            return {
                ...pref, [e.target.name]: e.target.value
            }
        })
    };

    const loginUser =()=>{
        console.log("LETS MAKE A LOGIN!");
        console.log("WE WILL SEND" + JSON.stringify(data));
        dispatch(changeLoading());
        dispatch(login(data));
        dispatch(changeIsLogin());
        dispatch(setMenuStatus(false));

    };

    const navigate = useNavigate();

    const signUpUser =()=>{
        dispatch(setMenuStatus(false));
        navigate('/signup');
    }

    return (
        <div className="login" style={{display: showLogin && !showResPass ? 'block' : 'none'}}>
            <img src={require("../images/loading.gif")} alt="loading..."
                 style={{display: loading ? 'block' : 'none'}}
                 className="loading"/>
            <h3 className="login__title">{translate('Войти')} {translate('или')}  <span onClick={()=>signUpUser()} className="login__signup">{translate('Зарегистрироваться')}</span></h3>
            <button className="login__close-btn" onClick={()=>dispatch(changeIsLogin())}>х</button>
            <input type="text" placeholder="example@gmail.com" className="login__input login__fi" name="email" value={data.email} onChange={(e)=>changeHandler(e)}/>
            <br/>
            <input type="text" placeholder="● ● ● ● ● ● ● ● ●" className="login__input login__si" name="password" value={data.password} onChange={(e)=>changeHandler(e)}/>
            <br/>

            <button className="login__remind-btn" onClick={()=>dispatch(changeIsResPass())}>{translate('Забыли пароль?')}</button>
            <br/>
            <button className="login__login-btn"
            onClick={()=>loginUser()}>{translate('Войти')}</button>


        </div>
    );
};

export default Login;