import React from 'react';
import {useSelector} from "react-redux";

const Map = () => {
    const isMenuShown = useSelector(state=>state.store.isMenuShown);


    return (
        <div className="map" style={{display : isMenuShown ? 'none' : 'block'}}>
            <div className="container map__subcontainer">


                {/*<div className="map__half">*/}
                {/*    <div className="map__contact">*/}
                {/*        <h3 className="map__contact-title">Свяжитесь с нами</h3>*/}

                {/*        <div className='map__inputs'>*/}
                {/*        <textarea cols="30" rows="10"*/}
                {/*                  placeholder="Введите ваше сообщение"*/}
                {/*                  className="map__text-area"*/}
                {/*        ></textarea>*/}

                {/*            <input type="email" placeholder="Enter your email" className="map__input"/>*/}
                {/*            <button className="map__btn">Contact</button>*/}


                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}

                <iframe className="map__iframe"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2923.857779519506!2d74.5788413156321!3d42.875845879155555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389ec8215943e167%3A0x157f154fed0a148a!2sSilk%20Way%20Travel%20Bishkek!5e0!3m2!1sru!2skg!4v1641890481225!5m2!1sru!2skg"
                        style={{width: "100%", height: "200px", border: 'none'}} allowFullScreen="" loading="lazy">

                </iframe>


            </div>
        </div>
    );
};

export default Map;