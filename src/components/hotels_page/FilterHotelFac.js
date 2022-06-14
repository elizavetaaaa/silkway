import React, {useEffect} from 'react';
import {addToHotelCAtsFilterListAction, deleteFromHotelCatsFilterListAction} from "../../redux/reducer/SearchReducer";
import {useDispatch, useSelector} from "react-redux";

const FilterHotelFac = ({props, category}) => {
    const lan = localStorage.getItem('lan');
    const dispatch = useDispatch();
    const addedFilterList = useSelector(state => state.searchReducer.addedFilterList);
    const addedHotelCatsFilterList = useSelector(state => state.searchReducer.addedHotelCatsFilterList);
    const addedRoomCatsFilterList = useSelector(state => state.searchReducer.addedRoomCatsFilterList);

    const addToFilterList = (value) => {
        if (!addedHotelCatsFilterList.includes(value)) {
            dispatch(addToHotelCAtsFilterListAction(value))
        } else {
            dispatch(deleteFromHotelCatsFilterListAction(value))

        }


    };


    useEffect(() => {
        let arr = document.getElementsByClassName("check-box-hotel");
        let checkBoxArray = Array.from(arr);
        checkBoxArray.map((el) => {
            let newArr =[];
            addedHotelCatsFilterList.map((item)=>{
                newArr.push(JSON.stringify(item));
            });

            if (!newArr.includes(el.value)) {
                el.checked = false;
            }
            else el.checked = true
        })
    }, [addedHotelCatsFilterList]);

    return (
        <div className="filter">
            <input type="checkbox" className="check-box-hotel" value={JSON.stringify(props)}
                   onClick={() => addToFilterList(props)}/>
            <p className="filter__name">{lan === "ru" ? props.hotel_category_name_ru : props.hotel_category_name_en}</p>

        </div>
    );
};


export default FilterHotelFac;
