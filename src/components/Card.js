import React from 'react';
import hotel from '../images/hotels/sheraton.jpg'

const Card = () => {
    return (
        <div className="card">
            <img src={hotel} alt="hotel" className="card__img"/>
            <p className="card__location">Tashkent Uzbekistan</p>
            <h4 className="card__hotel-name">The Resident Soho</h4>
            <div className="card__extra">
                <p className="card__price">$ 200 per night</p>
                <div className="card__raiting">4.8</div>
            </div>

        </div>
    );
};

export default Card;