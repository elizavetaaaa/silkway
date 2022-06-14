import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    addToFilterListAction, addToFoodCAtsFilterListAction, addToRoomCatsFilterListAction,
    deleteFilterAction,
    deleteFromFoodCatsFilterListAction, deleteFromRoomCatsFilterListAction
} from "../../redux/reducer/SearchReducer";
import {isDisabled} from "@testing-library/user-event/dist/utils";

const FilterRoom = ({props, category}) => {
    const dispatch = useDispatch();
    const addedFilterList = useSelector(state => state.searchReducer.addedFilterList);
    const addedRoomCatsFilterList = useSelector(state => state.searchReducer.addedRoomCatsFilterList);
    const addToFilterList = (value) => {
        if (!addedRoomCatsFilterList.includes(value)) {
            dispatch(addToRoomCatsFilterListAction(value))
        }
        else {
            dispatch(deleteFromRoomCatsFilterListAction(value))

        }


    };

    useEffect(() => {
        let arr = document.getElementsByClassName("check-box-room");
        let checkBoxArray = Array.from(arr);
        checkBoxArray.map((el) => {
            let newArr =[];
            addedRoomCatsFilterList.map((item)=>{
                newArr.push(JSON.stringify(item));
            });

            if (!newArr.includes(el.value)) {
                el.checked = false;
            }
            else el.checked = true
        })
    }, [addedRoomCatsFilterList]);

    const lan  = localStorage.getItem('lan');
    return (
        <form className="filter">
            <input type="checkbox"
                   value={JSON.stringify(props)} className="check-box-room" onChange={() => addToFilterList(props)}/>
            <p className="filter__name">{lan === 'ru' ? props.room_category_name_ru : props.room_category_name_en}</p>

        </form>
    );
};

export default FilterRoom;