import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {FiSend} from "react-icons/fi";
import {changeLoading, regConfirmProperty} from "../../redux/reducer/authReducer";

const Property = () => {
    const dispatch = useDispatch();

    const showProperty = useSelector(state => state.switchRegTypes.showProperty);
    const confirmDataProperty = useSelector(state => state.switchRegTypes.confirmDataProperty);
    const resultProperty = useSelector(state => state.registration.resultProperty);
    const resultMessageProperty = useSelector(state => state.registration.resultMessageProperty);
    const loading = useSelector(state => state.registration.loading);

    const [data, setData] = useState({
        'fio': '',
        'object_name': '',
        'address': '',
        'phone': '',
        'email': ''
    });

    const changeHandler = (e) => {
        setData((pref) => {
            return {
                ...pref, [e.target.name]: e.target.value
            }
        })
        console.log(data)
    };


    const sendData = (e) => {
        console.log("function 1");
        console.log(data)
        e.preventDefault();
        dispatch(changeLoading());
        dispatch(regConfirmProperty(data));
        setData({
            fio: '',
            'object_name': '',
            'address': '',
            'phone': '',
            'email': ''

        })

    }

    console.log("че имеем" + resultProperty, resultMessageProperty)


    return (
        <div className="property" style={{display: showProperty ? 'block' : 'none'}}>
            <div className="property__attention-div">
                <p className="property__attention-message">Внимание! Для регистрации и добавления своего объекта на наш
                    сайт, Вам необходимо заполнить следующую форму. Отправленные Вами данные будут рассмотрены в течении
                    суток,
                    после чего с вами свяжется наш менеджер </p>
            </div>

            <form className="property__form" onSubmit={(e) => sendData(e)}>
                <h3 className="property__title">Заполните форму
                    <span className="property__imp-sign">*</span>
                </h3>

                <img src={require("../../images/loading.gif")} alt="loading..."
                style={{display: loading ? 'block' : 'none'}}
                className="loading"/>

                <div className="property__input-block">
                    <input required type="text" placeholder="ФИО директора" className="property__text-input"
                           value={data.fio} name="fio"
                           onChange={changeHandler}/>
                    <input required type="text" placeholder="Название объекта" className="property__text-input"
                           value={data.object_name} name="object_name"
                           onChange={changeHandler}/>
                </div>


                <div className="property__input-block">
                    <input required type="text" placeholder="Контактный телефон" className="property__text-input"
                           value={data.phone} name="phone"
                           onChange={changeHandler}/>
                    <input required type="text" placeholder="email" className="property__text-input"
                           value={data.email} name="email"
                           onChange={changeHandler}/>
                </div>

                <div className="property__input-block">
                    <input required type="text" placeholder="Адрес объекта" className="property__text-input"
                           value={data.address} name="address"
                           onChange={changeHandler}/>
                    <select type="text" placeholder="Тип объекта" className="property__select-input">
                        <option value="0"> Тип объекта</option>
                        <option value="0">Хостел</option>
                        <option value="0">Отель</option>
                        <option value="0">Гэст хаус</option>
                    </select>
                </div>

                <div className="property__submit-btn-div">
                    <button type="submit" className="property__submit-btn">Отправить <span
                        className="property__space-span"></span><FiSend/></button>
                </div>

            </form>


            <div className="property__mess-div" style={{display: resultProperty === 1 ? 'block' : 'none'}}>

                <p className="property__result-mes">
                    {resultMessageProperty}</p>
            </div>


        </div>
    );
};

export default Property;