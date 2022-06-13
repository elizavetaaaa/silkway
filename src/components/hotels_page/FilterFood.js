import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    addToFilterListAction, addToFoodCAtsFilterListAction, addToRoomCatsFilterListAction,
    deleteFilterAction,
    deleteFromFoodCatsFilterListAction, deleteFromRoomCatsFilterListAction
} from "../../redux/reducer/SearchReducer";
import {isDisabled} from "@testing-library/user-event/dist/utils";

const FilterFood = ({props, category}) => {
    const dispatch = useDispatch();
    const addedFilterList = useSelector(state => state.searchReducer.addedFilterList);
    const addedFoodCatsFilterList = useSelector(state => state.searchReducer.addedFoodCatsFilterList);

    const addToFilterList = (value) => {
        console.log(value)
        console.log(addedFoodCatsFilterList.includes(value))
        if (!addedFoodCatsFilterList.includes(value)) {
            // dispatch(addToFilterListAction(value))
            dispatch(addToFoodCAtsFilterListAction(value))


        }
        else {
            // dispatch(deleteFilterAction(value))
            dispatch(deleteFromFoodCatsFilterListAction(value))

        }


    };

    useEffect(() => {
        let arr = document.getElementsByClassName("check-box-food");
        let checkBoxArray = Array.from(arr);
        console.log(checkBoxArray)
        checkBoxArray.map((el) => {
            console.log(el.value);
            let newArr =[];
            addedFoodCatsFilterList.map((item)=>{
                newArr.push(JSON.stringify(item));
            });

            if (!newArr.includes(el.value)) {
                el.checked = false;
            }
            else el.checked = true
        })
    }, [addedFoodCatsFilterList]);


    const lan  = localStorage.getItem('lan');
    return (
        <form className="filter">
            <input type="checkbox"
                   value={JSON.stringify(props)} className="check-box-food" onChange={() => addToFilterList(props)}/>
            <p className="filter__name">{lan === 'ru' ? props.food_category_name_ru : props.food_category_name_en}</p>

        </form>
    );
};

export default FilterFood;