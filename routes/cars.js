var express = require('express');
var router = express.Router();
const carController = require('../Controllers/carController');


/* GET home page. */
router.get('/getCars', carController.getCars);
router.get('/getCarById/:id', carController.getCarById);
router.post('/AddCar', carController.AddCar);
router.put('/UpdateCar/:id', carController.UpdateCar);
router.put('/addCarWithOwner', carController.addCarWithOwner);
router.delete('/DeleteCar/:id', carController.DeleteCar);


module.exports = router;

/*var express = require('express');
var router = express.Router();
const authMiddlewares = require('../middlewares/authMiddlewares');
const carController = require('../Controller/carController');

router.get('/GetAllCars',carController.getAllCars)
router.get('/getCarById/:id',carController.getCarById)
router.post('/addCar',carController.addCar)
router.post('/addCarWithOwner',carController.addCarWithOwner)
router.put('/updateCar/:id',)
router.delete('/deleteCar/:id',)

module.exports = router;*/