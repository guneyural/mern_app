const router = require('express').Router();
const Car = require('../models/car');
const User = require('../models/user');

//get all cars from the database
router.get('/', async (req, res)=>{
    const cars = await Car.find({owner: req.user.id});

    res.json(cars);
});

//add car to the database
router.post('/', async (req, res)=>{
    const newCar = new Car({
        name: req.body.name,
        owner: req.body.owner
    });
    const saveCar = await newCar.save();

    res.json(saveCar);
});

//remove car from the database
router.delete('/:id', async (req, res)=>{
    const getCar = await Car.findById(req.params.id);
    getCar.remove();

    res.json({msg: 'Car removed from database'});
});

module.exports = router;