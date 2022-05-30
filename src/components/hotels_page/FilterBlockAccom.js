import React from 'react';
import Filter from "./Filter";

const FilterBlockFacilities = ({props}) => {
    return (
        <div className="filterBlock">
            <div className="filterBlock__block">
                <h4 className="filterBlock__title">{props}</h4>
                <Filter props='Pets allowed'/>
                <Filter props='Suitable for children'/>
                <Filter props='Smoking allowed'/>
                <Filter props='People With disabilities'/>


            </div>

        </div>
    );
};

export default FilterBlockFacilities;