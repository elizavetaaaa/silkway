import React, {useEffect} from 'react';
import HotelCard from "../components/hotels_page/HotelCard";
import {useDispatch, useSelector} from "react-redux";
import translate from "../i18n/translate";
import location from "../images/icons/location.svg";
import calendar from "../images/icons/calendar.svg";
import person from "../images/icons/person.svg";
import {AiFillCheckSquare} from "react-icons/ai";
import {changeFilterStatus} from "../redux/reducer/visReducer";
import {
    getCategories,
    getFoodCategories,
    getHotelFacilities,
    getRoomFacilities,
    getStarRating
} from "../redux/reducer/SearchReducer";
import FilterRoomFacilities from "../components/hotels_page/FilterRoomFacilities";
import FilterFoodCategories from "../components/hotels_page/FilterFoodCategories";
import FilterHotelFacilities from "../components/hotels_page/FilterHotelFacilities";
import FakeCard from "../components/hotels_page/fakeCard";
import {setLocale} from "../redux/reducer/lanReducer";
import {LOCALES} from "../i18n";


const Hotels = () => {

    useEffect(() => {
        dispatch(getStarRating());
        dispatch(getHotelFacilities());
        dispatch(getRoomFacilities());
        dispatch(getFoodCategories());
        dispatch(getCategories());
    }, []);

    const starRatingList = useSelector(state => state.searchReducer.starRatingList);
    const hotelFacilitiesList = useSelector(state => state.searchReducer.hotelFacilitiesList);
    const roomFacilitiesList = useSelector(state => state.searchReducer.roomFacilitiesList);
    const foodCategoriesList = useSelector(state => state.searchReducer.foodCategoriesList);
    const searchResult = useSelector(state => state.searchReducer.searchResult);
    const categories = useSelector(state => state.searchReducer.categories);

    console.log("HOTEL PAGE" + hotelFacilitiesList)

    console.log("rooms" + roomFacilitiesList)

    const dispatch = useDispatch();
    const isMenuShown = useSelector(state => state.store.isMenuShown);
    const isFilterActive = useSelector(state => state.store.isFilterActive);
    const filterHandler = () => {
        dispatch(changeFilterStatus());
    };

    useEffect(() => {
        if (localStorage.getItem('lan') === 'ru') {
            dispatch(setLocale(LOCALES.RUSSIAN));
            document.getElementById('lang-small').value = 'RU';
            document.getElementById('lang').value = 'RU'
        } else {
            document.getElementById('lang-small').value = 'ENG';
            document.getElementById('lang').value = 'ENG';
            dispatch(setLocale(LOCALES.ENGLISH))
        }

    }, []);
    let lan = localStorage.getItem('lan');

    // Additional services
    // Catering services
    // Meetings/Events
    // Languages spoken at the hotel
    let add_serv_list =[];
    let cat_serv_list =[];
    let meetings_list =[];
    let lang_list =[];

    hotelFacilitiesList.map((el)=>{
        if(el.category_id.name_en === 'Languages spoken at the hotel'){
            lang_list.push(el)
        }
        else if(el.category_id.name_en === 'Meetings/Events'){
            meetings_list.push(el)
        }

        else if(el.category_id.name_en === 'Catering services'){
            cat_serv_list.push(el)
        }
        else if(el.category_id.name_en === 'Additional services'){
            add_serv_list.push(el)
        }


    });





    return (
        <div className="hotels" style={{display: isMenuShown ? 'none' : 'block'}}>
            <div className="hotels__top-section">
                <div className="hotels__filter-btns">
                    <button className="hotels__filter-btn"
                            style={{color: isFilterActive ? '#0fab60' : 'grey'}}
                            onClick={() => filterHandler()}>{translate('Фильтры')}<AiFillCheckSquare
                        className="booking__filter-icon"/></button>
                    <button className="hotels__filter-btn" style={{display: isFilterActive ? 'block' : 'none'}}>Поиск по
                        фильтрам
                    </button>

                </div>

                <form className="booking__form hotels__form">

                    <div className="booking__el hotels__el">
                        <img src={location} alt="location" className="booking__icon"/>
                        <div className="booking__dest-div">
                            <label htmlFor="" className="booking__label">{translate('Направление')}</label>
                            <input type="text" placeholder='Город или отель' className="booking__input"/>
                        </div>
                    </div>

                    <div className="booking__el hotels__el">
                        <img src={calendar} alt="location" className="booking__icon"/>
                        <div className="booking__date-div">
                            <label htmlFor="" className="booking__label">{translate('Заезд')}</label>
                            <input type="date" placeholder="22-10-2023" className="booking__input"/>
                        </div>
                    </div>

                    <div className="booking__el hotels__el">
                        <img src={calendar} alt="location" className="booking__icon"/>
                        <div className="booking__date-div">
                            <label htmlFor="" className="booking__label">{translate('Выезд')}</label>
                            <input type="date" placeholder="22-11-2023" className="booking__input"/>
                        </div>
                    </div>

                    <div className="booking__el hotels__el">
                        <img src={person} alt="location" className="booking__icon"/>
                        <div className="booking__guest-div">
                            <label htmlFor="" className="booking__label">{translate('Гости')}</label>
                            <input type="text" placeholder="4 person" className="booking__input"/>
                        </div>
                    </div>

                    <div className="booking__el hotels__el">
                        <button className="booking__btn hotels__btn">{translate('Поиск')}</button>
                    </div>

                </form>
            </div>


            <div className="hotels__main">
                <div className="hotels__filters">
                    {categories.map((el) => {
                        return <FilterHotelFacilities props={lan === 'ru' ? el.name_ru : el.name_en} list={
                            el.name_en === 'Meetings/Events' ? meetings_list :
                                el.name_en === 'Languages spoken at the hotel' ? lang_list :
                                el.name_en === 'Catering services' ? cat_serv_list :
                                el.name_en === 'Additional services' ? add_serv_list : ''


                        }/>

                    })}
                    <FilterRoomFacilities props={translate("Услуги комнат")} list={roomFacilitiesList}/>
                    <FilterFoodCategories props={translate("Питание")} list={foodCategoriesList}/>


                </div>


                {/*// при адаптации на маленькие экраны*/}
                <div className="hotels__filters-small" style={{
                    display: isFilterActive ? 'block' : 'none', background: '#fff'
                }}>
                    <FilterHotelFacilities props={translate("Количество звезд")} list={starRatingList}/>
                    <FilterHotelFacilities props={translate("Услуги отелей")} list={hotelFacilitiesList}/>
                    <FilterRoomFacilities props={translate("Услуги комнат")} list={roomFacilitiesList}/>
                    <FilterFoodCategories props={translate("Питание")} list={foodCategoriesList}/>

                </div>


                <div className="hotels__cards" style={{
                    display: !isFilterActive ? 'block' : 'none', background: '#fff'
                }}>
                    {/*<HotelCard/>*/}
                    {searchResult.map((item) => {
                        return <HotelCard props={item}/>
                    })
                    }

                </div>
            </div>


        </div>
    );
};

export default Hotels;