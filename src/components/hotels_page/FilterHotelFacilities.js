import React from 'react';
import Filter from "./Filter";

const FilterHotelFacilities = ({props, list}) => {
    let lan = localStorage.getItem('lan');
    return (
        <div className="filterBlock">
            <div className="filterBlock__block">
                <h4 className="filterBlock__title">{props}</h4>
                {list?.map((el)=>{
                    return <Filter props={lan === 'ru' ? el.hotel_category_name_ru : el.hotel_category_name_en}/>})}

            </div>

        </div>
    );
};

export default FilterHotelFacilities;