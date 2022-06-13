import React from 'react';
import FilterHotelFac from "./FilterHotelFac";

const FilterHotelFacilities = ({props, list, parent}) => {
    let lan = localStorage.getItem('lan');
    return (
        <div className="filterBlock">
            <div className="filterBlock__block">
                <h4 className="filterBlock__title">{props}</h4>
                {list?.map((el)=>{
                    return <FilterHotelFac props={el} category = {'hotel_category'}/>})}
            </div>

        </div>
    );
};

export default FilterHotelFacilities;