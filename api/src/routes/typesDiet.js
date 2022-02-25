const { Router } = require('express');
const router = Router();
const { Recipe, Diet } = require('../db.js');
const {typesDiets} = require('./functions.js');

router.get('/', async (req, res, next) => {
    const allDiets = await typesDiets();
    allDiets ? res.send(allDiets) : res.status(404).send("Diets don't found")
})

module.exports = router;