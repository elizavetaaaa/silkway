import React from 'react';
import hotel from '../images/hotels/novotel.jpg'

const Card = () => {
    return (
        <div className="card">
            <img src={hotel} alt="hotel" className="card__img"/>
            <p className="card__location">Almaty Kazahstan</p>
            <h4 className="card__hotel-name">Novotel</h4>
            <div className="card__extra">
                <p className="card__price">$ 300 per night</p>
                <div className="card__raiting">5.1</div>
            </div>

        </div>
    );
};

export default Card;