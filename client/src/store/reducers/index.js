import { CLEAN_DETAILS, CREATE_RECIPE, FILTER_BY_C_A, FILTER_BY_DIET, FILTER_BY_NAME, GET_DETAILS, SEARCH_RECIPE } from "../actions"

const initialState = {
    foods: [],
    details: {},
    diets: [],
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case SEARCH_RECIPE:
            action.payload.forEach(el => {
                if (el.id.length > 12) {
                    el.diets = el.diets.map(diet => diet.name)
                    el.stepToStep = JSON.parse(el.stepToStep)
                }
            })
            return { ...state, foods: action.payload };
        case FILTER_BY_NAME:
            const filteredByName = state.foods.filter(el => el.name.toLowerCase().includes(action.payload.toLowerCase()))
            return { ...state, foods: filteredByName }
        case FILTER_BY_DIET:
            const filteredFoods = state.foods.filter(el => {

                if (action.payload === "none") return el;
                else return el.diets.includes(action.payload.toLowerCase());
            })
            return { ...state, foods: filteredFoods };
        case FILTER_BY_C_A:
            let sortedFoods;
            if (action.CA === "byCalification") {
                if (action.order === "Asc") {
                    sortedFoods = state.foods.sort((a, b) => {
                        if (a.calification > b.calification) return 1
                        if (a.calification < b.calification) return -1
                        return 0
                    })
                }
                if (action.order === 'Desc') {
                    sortedFoods = state.foods.sort((a, b) => {
                        if (a.calification > b.calification) return -1
                        if (a.calification < b.calification) return 1
                        return 0
                    })
                }
            }
            if (action.CA === "byAlpha") {
                if (action.order === "Asc") {
                    sortedFoods = state.foods.sort((a, b) => {
                        if (a.name > b.name) return 1
                        if (a.name < b.name) return -1

                        return 0
                    })
                }
                if (action.order === 'Desc') {
                    sortedFoods = state.foods.sort((a, b) => {
                        if (a.name > b.name) return -1
                        if (a.name < b.name) return 1
                        return 0
                    })
                }
            }

            return { ...state, foods: sortedFoods }
        case GET_DETAILS:
            if (Array.isArray(action.payload)) {
                action.payload = action.payload[0]
                action.payload.diets = action.payload.diets.map(diet => diet.name)
                action.payload.stepToStep = JSON.parse(action.payload.stepToStep)
            }
            return { ...state, details: action.payload }
        case CLEAN_DETAILS:
            return { ...state, details: {} }
        case CREATE_RECIPE:
            return { ...state }
        default:
            return state;
    }
}