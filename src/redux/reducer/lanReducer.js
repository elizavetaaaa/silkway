const SET_LOCALE = 'SET_LOCALE';
const initialState = {
    locale: '',


};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_LOCALE: {
            console.log("we got " + action.lan)
            return {
                ...state,
                locale: action.lan
            }
        }

        default :
            return initialState
    }
}


export const setLocale = (lan) => {
    console.log("here");
    console.log(lan);
    return({ type: SET_LOCALE,
        lan: lan})

};

