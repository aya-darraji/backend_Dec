var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const uploadFile = require('../middlewares/uploadFile');
const ValidationUser = require('../middlewares/ValidationUser');
/* GET users listing. */
router.get('/getAllUsers',userController.getAllUsers );
router.get('/getSortUsersByAge',userController.getSortUsersByAge );
router.get('/getSortUsersByDate',userController.getSortUsersByDate );
router.get('/searchUsersByUsername',userController.searchUsersByUsername );
router.post('/addUserClient',ValidationUser,userController.addUserClient );
//router.post('addUserWithImg',uploadFile.single("image_user"),userController.addUserWithImg);
router.put('/updateUser/:id',userController.updateUser );
router.put('/updatepassword /:id',userController.updatepassword );
router.put('/updateUserWithImg/:id',uploadFile.single("image_user"),userController.updateUserWithImg );
router.delete('/deletedUser/:id',userController.deleteUser );


module.exports = router;
