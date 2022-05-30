import React from 'react';

const Filter = ({props}) => {
    return (
        <div className="filter">
            <input type="checkbox"/>

            <p className="filter__name">{props}</p>

        </div>
    );
};

export default Filter;