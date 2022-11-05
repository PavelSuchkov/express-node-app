import User from './../models/User.js';
import Role from "./../models/Role.js";

class AuthController {

    async registration(req, res) {
        try {

        } catch (e) {

        }
    }

    async login(req, res) {
        try {

        } catch (e) {

        }
    }

    async getUsers(req, res) {
        try {
            // const userRole = new Role()
            // const adminRole = new Role({value: "ADMIN"})
            // await userRole.save()
            // await adminRole.save()
            res.json('server works')
        } catch (e) {

        }
    }
}

export default new AuthController()