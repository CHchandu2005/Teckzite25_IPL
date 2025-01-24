const router=require('express').Router()
const apiController=require('../controllers/apiController')
const authenticateAdmin = require('../middleware/auth');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });
router.get('/getplayers',apiController.getplayers);
router.get('/playersToBuy',apiController.playersToBuy);
router.get('/soldPlayers',apiController.soldPlayers);
router.get('/getTeams',apiController.getTeams);

//router.post("/createplayer",apiController.player);
router.post("/createTeam",authenticateAdmin,apiController.createTeam);
router.post('/bid',authenticateAdmin,apiController.bid);
router.delete('/deleteTeam',authenticateAdmin,apiController.deleteTeam);
router.delete('/deletePlayer',authenticateAdmin,apiController.deletePlayer);
router.post('/createplayer',authenticateAdmin,upload.single('image'), apiController.player);
module.exports = router;
