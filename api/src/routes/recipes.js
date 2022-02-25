const { Router } = require('express');
const router = Router();
const { Recipe, Diet } = require('../db.js');
const { getRecipes, getRecipeById, typesDiets } = require('./functions.js')
const { Op } = require('sequelize')


router.get('/', async (req, res, next) => {
    const { name } = req.query;
    const recipes = await getRecipes(name)
    if (name) {
        const filteredRecipes = recipes.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
        filteredRecipes.length ? res.send(filteredRecipes) : res.status(404).send("Recipes don't found")
    }
    else res.send(recipes)

})

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    const recipeInfo = await getRecipeById(id)
    res.send(recipeInfo);

})

router.post('/', async (req, res, next) => {
    let { name, description, calification, healthy, stepToStep, diets, image } = req.body;
    stepToStep = JSON.stringify(stepToStep);
    const [newRecipe, bool] = await Recipe.findOrCreate({
        where: {
            name,
            description,
            calification,
            healthy,
            stepToStep,
            image
        }
    })
    await typesDiets();
    const dietsDb = await Diet.findAll({
        where: {
            name: {
                [Op.in]: diets
            }
        },
        attributes: ["id"]
    })
    const dietsIds = dietsDb.map(el => el.id)
    newRecipe.setDiets(dietsIds);
    res.send('Done');
})

module.exports = router;
