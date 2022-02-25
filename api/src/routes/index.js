const { Router } = require('express');
const router = Router();
const { Recipe, Diet } = require('../db.js');
const { getRecipe, getRecipeByID, prechargeDiets: prechargeDiets } = require('./functions.js')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipesRoute = require('./recipes');
const dietsRoute = require('./typesDiet')
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.use('/recipes', recipesRoute)
router.use('/types', dietsRoute)


module.exports = router;
