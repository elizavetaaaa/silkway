import {applyMiddleware, createStore, compose} from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducer";
import {composeWithDevTools} from "redux-devtools-extension";

const initialState = {

};

const composeFunc = process.env.NODE_ENV === 'development' ? composeWithDevTools : compose();
const composeEnchanters = composeFunc(applyMiddleware(thunk));
const store = createStore(rootReducer(),initialState, composeEnchanters);


export default store;