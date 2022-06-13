import './App.scss';
import Header from "./images/Header";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Ways from "./pages/Ways";
import SmallMenu from "./components/SmallMenu";
import {I18Provider, LOCALES} from "./i18n";
import onError from "./i18n/error";
import {setLocale} from "./redux/reducer/lanReducer";
import {
    getCategories,
    getFoodCategories,
    getHotelFacilities,
    getRoomFacilities,
    getStarRating, setHotelFacsAction
} from "./redux/reducer/SearchReducer";
import Login from "./components/Login";
import RemindPass from "./components/RemindPass";
import Footer from "./components/Footer";


function App() {
    const showLogin = useSelector(state => state.store.showLogin);
    const dispatch = useDispatch();
    const loading = useSelector(state => state.registration.loading);
    const locale = useSelector(state => state.lanReducer.locale);

    useEffect(() => {
        if (localStorage.getItem('lan') === 'ru') {
            dispatch(setLocale(LOCALES.RUSSIAN));
            document.getElementById('lang-small').value = 'RU';
            document.getElementById('lang').value = 'RU'
        } else {
            document.getElementById('lang-small').value = 'ENG';
            document.getElementById('lang').value = 'ENG';
            document.getElementById('lang').value = 'ENG';
            dispatch(setLocale(LOCALES.ENGLISH))
        }
        localStorage.setItem("currency", 'USD')

    }, []);


    useEffect(() => {
        dispatch(getStarRating());
        dispatch(getHotelFacilities());
        dispatch(getRoomFacilities());
        dispatch(getFoodCategories());
        dispatch(getCategories());
    }, []);
    const hotelFacilitiesList = useSelector(state => state.searchReducer.hotelFacilitiesList);
    let dividedFacsEn ={};
    let dividedFacsRu ={};
    hotelFacilitiesList.map((el)=>{
        if(!dividedFacsEn[el?.category_id?.name_en]){
            dividedFacsEn[el?.category_id?.name_en] =[];
        }
        if(!dividedFacsRu[el?.category_id?.name_ru]){
            dividedFacsRu[el?.category_id?.name_ru] =[];
        }
    });

    hotelFacilitiesList.map((item)=>{
        dividedFacsEn[item?.category_id?.name_en].push(item)

    });
    hotelFacilitiesList.map((item)=>{
        dividedFacsRu[item?.category_id?.name_ru].push(item)

    });

    dispatch(setHotelFacsAction(dividedFacsRu, dividedFacsEn))



    return (
        <I18Provider locale={locale} onError={onError}>
            <div className="App"
                 style={{
                     opacity: loading ? '50%' : '',
                     position : 'relative'
                 }}>
                <Header/>
                <Login/>
                <RemindPass/>
                <SmallMenu/>


                <Ways/>

            </div>
        </I18Provider>
    );
}

export default App;


