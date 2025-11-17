const express = require("express");
const router = express.Router();

const creating_Trainer_Profile = require('../Middlewares/Creating_Trainer_Profile_Middleware');
const Trainer_Controller = require('../Controllers/Controllers');

router.post('/', creating_Trainer_Profile, Trainer_Controller.createTrainerProfile);

router.get('/:trainer_id', Trainer_Controller.getTrainerProfile);

router.get('/', Trainer_Controller.getAllTrainers);

router.put('/update-name/:trainer_id', Trainer_Controller.updateTrainerName);

module.exports = router;
