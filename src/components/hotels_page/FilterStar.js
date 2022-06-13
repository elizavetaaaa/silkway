import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    addToRoomCatsFilterListAction,
    addToStarListAction,
    deleteFromRoomCatsFilterListAction, deleteFromStarListAction
} from "../../redux/reducer/SearchReducer";

const FilterStar = ({props, category}) => {

    const dispatch = useDispatch();
    const addedFilterList = useSelector(state => state.searchReducer.addedFilterList);
    const starRatingList = useSelector(state => state.searchReducer.starRatingList);
    const addedStarList = useSelector(state => state.searchReducer.addedStarList);
    const addToFilterList = (value) => {
        if (!addedStarList.includes(value)) {
            // dispatch(addToFilterListAction(value))
            dispatch(addToStarListAction(value))
        }
        else {
            // dispatch(deleteFilterAction(value))
            dispatch(deleteFromStarListAction(value))

        }


    };

    useEffect(() => {
        let arr = document.getElementsByClassName("check-box-star");
        let checkBoxArray = Array.from(arr);
        console.log(checkBoxArray)
        checkBoxArray.map((el) => {
            console.log(el.value);
            let newArr =[];
            addedStarList.map((item)=>{
                newArr.push(JSON.stringify(item));
            });

            if (!newArr.includes(el.value)) {
                el.checked = false;
            }
            else el.checked = true
        })
    }, [addedStarList]);

    const lan  = localStorage.getItem('lan');
    return (
        <form className="filter">
            <input type="checkbox"
                   value={JSON.stringify(props)} className="check-box-star" onChange={() => addToFilterList(props)}/>
            <p className="filter__name">{lan === 'ru' ? props.hotel_category_name_ru : props.hotel_category_name_en}</p>

        </form>
    );
};

export default FilterStar;