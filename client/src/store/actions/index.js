import axios from 'axios'

const URL = 'http://localhost:3001/'
export const SEARCH_RECIPE = 'SEARCH_RECIPE';
export const FILTER_BY_NAME = 'FILTER_BY_NAME';
export const FILTER_BY_DIET = "FILTER_BY_DIET";
export const FILTER_BY_C_A = "FILTER_BY_C_A";
export const GET_DETAILS = "GET_DETAILS";
export const CLEAN_DETAILS = "CLEAN_DETAILS";
export const CREATE_RECIPE = "CREATE_RECIPE";

export const searchRecipe = () => {
    return async function (dispatch) {
        const response = await axios.get(URL + `recipes`)
        await dispatch({ type: SEARCH_RECIPE, payload: response.data })
    }
}

export const filterByname = (name) => {
    return {
        type: FILTER_BY_NAME,
        payload: name
    }
}

export const filterByDiet = (diet) => {
    return {
        type: FILTER_BY_DIET,
        payload: diet
    }
}

export const filterByCA = (order, CA) => {
    return {
        type: FILTER_BY_C_A,
        order,
        CA,

    }
}

export const getDetails = (payload) => {
    return async function (dispatch) {
        const response = await axios.get(URL + 'recipes/' +  payload.id)
        dispatch({ type: GET_DETAILS, payload: response.data})
    }
}

export const cleanDetails = () => {
    return {
        type: CLEAN_DETAILS
    }
}

export const createRecipe = (recipe) => {
    return async function(dispatch) {
        const response = await axios.post(URL + 'recipes', recipe);
        dispatch({type: CREATE_RECIPE, payload: response})
    }
}