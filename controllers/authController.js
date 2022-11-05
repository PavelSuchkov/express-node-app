import User from './../models/User.js';
import Role from "./../models/Role.js";
import bcrypt from "bcryptjs"
import {validationResult} from "express-validator";
import jwt from 'jsonwebtoken'
import config from './../config.js'


const generateAccessToken = (id, roles ) => {
    const payload = {
        id, roles
    }
    return jwt.sign(payload, config.secret, {expiresIn: "24h"})
}

class AuthController {

    async registration(req, res) {
        try {
            const  errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({message: 'Registration errors ', errors})
            }
            const {username, password} = req.body
            const candidate = await User.findOne({username})
            if(candidate){
                res.status(400).json({message: 'User with this name already exist'})
            }
            const hashPassword = bcrypt.hashSync(password, 8)
            const userRole = await Role.findOne({value: 'USER'})

            const user = new User({username, password: hashPassword, roles: [userRole.value]})
            await user.save()
            return res.json({message: 'User successfully registered'})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Registration error'})
        }
    }

    async login(req, res) {
        try {
            const {username, password} = req.body
            const user = await User.findOne({username})
            if(!user){
                res.status(400).json({message: `Can not find user ${username}`})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if(!validPassword){
                res.status(400).json({message: `The password is wrong`})
            }
            const token = generateAccessToken(user._id,user.roles )
            return res.json({token})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Registration error'})
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find()

            res.json(users)
        } catch (e) {

        }
    }
}

export default new AuthController()