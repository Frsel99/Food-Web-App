require('dotenv').config();
const axios = require('axios');
const db = require('../db.js');
const { Recipe, Diet } = require('../db.js');
const { API_KEY } = process.env;

module.exports = {
    getRecipes: async (name) => {
        const apiRequest = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=30&addRecipeInformation=true`)
        const apiRecipes = apiRequest.data.results.map(el => {
            let diets = []
            if (el.vegetarian) diets.push('vegetarian')
            if (el.vegan) diets.push('vegan')
            if (el.glutenFree) diets.push("gluten free")
            if (el.diets.length) diets = diets.concat(...el.diets)
            diets = [...new Set(diets)]
            return {
                id: el.id,
                name: el.title,
                description: el.summary,
                calification: el.spoonacularScore,
                healthy: el.healthScore,
                stepToStep: el.analyzedInstructions && el.analyzedInstructions[0] && el.analyzedInstructions[0].steps,
                diets,
                image: el.image,
            }
        })
        let dbRecipes = await Recipe.findAll({
            include: Diet
        })
        if (dbRecipes.stepToStep) dbRecipes.stepToStep = JSON.parse(dbRecipes.stepToStep)
        
        return dbRecipes.concat(apiRecipes)
    },
    getRecipeById: async (id) => {
        if (id.length > 15) {
            let dbRecipe = await Recipe.findAll({
                where: {
                    id
                },
                include: Diet,
            })
            if (db.Recipe.stepToStep) db.Recipe.stepToStep = JSON.parse(dbRecipe.stepToStep);
            return dbRecipe;
        }
        const apiRequest = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
        let diets = []
        if (apiRequest.data.vegetarian) diets.push('vegetarian')
        if (apiRequest.data.vegan) diets.push('vegan')
        if (apiRequest.data.glutenFree) diets.push("gluten free")
        if (apiRequest.data.diets.length) diets = diets.concat(...apiRequest.data.diets)
        diets = [...new Set(diets)]
        const apiRecipe = {
            id: apiRequest.data.id,
            image: apiRequest.data.image,
            name: apiRequest.data.title,
            dishType: apiRequest.data.dishTypes,
            diets,
            description: apiRequest.data.summary,
            calification: apiRequest.data.spoonacularScore,
            healthy: apiRequest.data.healthScore,
            stepToStep: apiRequest.data && apiRequest.data.analyzedInstructions[0] && apiRequest.data.analyzedInstructions[0].steps,
        }
        return apiRecipe;
        // prop vegetarian, vegan, glutenfree y diets.
    },
    typesDiets: async () => {
        const allDiets = await Diet.findAll()
        if (allDiets.length) return allDiets;
        else return await Diet.bulkCreate([
            { name: 'Gluten Free' },
            { name: 'Dairy Free' },
            { name: 'Ketogenic' },
            { name: 'Vegetarian' },
            { name: 'Lacto-Vegetarian' },
            { name: 'Ovo-Vegetarian' },
            { name: 'Vegan' },
            { name: 'Pescatarian' },
            { name: 'Paleo' },
            { name: 'Primal' },
            { name: 'Low FODMAP' },
            { name: 'Whole30' }
        ])
    }
}