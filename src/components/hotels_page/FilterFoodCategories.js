import React from 'react';
import Filter from "./Filter";
import FilterFood from "./FilterFood";

const FilterFoodCategories = ({props, list}) => {
    let lan = localStorage.getItem('lan');

    return (
        <div className="filterBlock">
            <div className="filterBlock__block">
                <h4 className="filterBlock__title">{props}</h4>
                {list?.map((el) => {
                    return <FilterFood props={el } category={'food_category'}/>
                })}

            </div>

        </div>
    );
};

export default FilterFoodCategories;