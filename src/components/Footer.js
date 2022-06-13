import React from 'react';
import logo from '../images/logo-white.svg';
import { AiOutlineInstagram, AiOutlineFacebook, AiOutlineMail } from "react-icons/ai";


const Footer = () => {
    return (
        <div className="footer">
            <div className="container">
                <div className="footer__row">
                    <div className="footer__col">
                        <ul className="footer__ul">
                            <li><img src={logo} alt="logo" style={{height: '50px'}}/></li>
                            <li className="footer__lozung">Find your perfect way to stay!</li>
                        </ul>

                    </div>
                    <div className="footer-col">
                        <div className="footer__media-icons">
                        <a href="https://instagram.com/silkwaytravel.kg?igshid=YmMyMTA2M2Y=" target="_blank" className="footer__media-link"><AiOutlineInstagram className="footer__media-link"    /></a>
                        <a href="https://ru-ru.facebook.com/silkwaytravel.kg/" target="_blank" className="footer__media-link"><AiOutlineFacebook className="footer__media-link" /></a>
                        <a href="#" className="footer__media-link"><AiOutlineMail className="footer__media-link" /></a>
                    </div></div>
                </div>
            </div>

        </div>
    );
};

export default Footer;