import axios from "axios";

const SHOW_INDIVIDUAL = 'SHOW_INDIVIDUAL'
const SHOW_ENTITY = 'SHOW_ENTITY'
const SHOW_PROPERTY = 'SHOW_PROPERTY'

const HIDE_INDIVIDUAL = 'HIDE_INDIVIDUAL'
const HIDE_ENTITY = 'HIDE_ENTITY'
const HIDE_PROPERTY = 'HIDE_PROPERTY';


const initialState = {
    showIndividual: true,
    showEntity: false,
    showProperty: false,

};

export default (state = initialState, action) => {
    switch (action.type) {
        case SHOW_ENTITY: {
            return {
                ...state,
                showIndividual: false,
                showEntity: true,
                showProperty: false,

            }
        }

        case SHOW_INDIVIDUAL: {
            return {
                ...state,
                showIndividual: true,
                showEntity: false,
                showProperty: false

            }
        }
        case SHOW_PROPERTY: {
            return {
                ...state,
                showIndividual: false,
                showEntity: false,
                showProperty: true

            }
        }



        default :
            return state
    }
}


export const showIndividual = () => ({
    type: SHOW_INDIVIDUAL
});

export const showEntity = () => ({
    type: SHOW_ENTITY
});

export const showProperty = () => ({
    type: SHOW_PROPERTY
});
