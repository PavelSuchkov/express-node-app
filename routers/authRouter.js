import {Router} from "express";
import controller from "./../controllers/authController.js";
import {check} from 'express-validator'
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";


const router = new Router()

router.post('/registration', [
    check('username', 'The username can not be empty').notEmpty(),
    check('password', 'The password should contains from 4 to 10 symbols').isLength({min: 4, max: 10})
], controller.registration)
router.post('/login', controller.login)
router.get('/users', roleMiddleware(['ADMIN']), controller.getUsers)

export default router