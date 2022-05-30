import {combineReducers} from "redux";
import store from "./visReducer";
import store1 from "./loginReducer";
import registration from "./authReducer";
import switchRegTypes from "./SwitchRegTypesReducer";
import lanReducer from "./lanReducer";
import searchReducer from "./SearchReducer";



const rootReducer = () => combineReducers({
    store, store1, registration, switchRegTypes, lanReducer, searchReducer

});
export default rootReducer;