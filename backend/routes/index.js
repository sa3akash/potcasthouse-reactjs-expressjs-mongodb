const router = require('express').Router();
const AuthController = require('../controllers/authControllers')
const ActivateController = require('../controllers/activateControllers')
const ActivateMiddleware = require('../middlewares/authMiddlewares');
const authControllers = require('../controllers/authControllers');
const roomsController = require('../controllers/roomsControllers');



router.post('/send-otp', AuthController.sendOtp);
router.post('/verify-otp', AuthController.verifyOtp);
router.post('/activate',ActivateMiddleware ,ActivateController.activate);
router.get('/refresh', authControllers.refresh);
router.post('/logout', ActivateMiddleware, authControllers.logout);
router.post('/rooms', ActivateMiddleware, roomsController.create);
router.get('/rooms', ActivateMiddleware, roomsController.getAllRooms);



module.exports = router;