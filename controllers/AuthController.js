const db = require('../models/index');
const UserModel = db.sequelize.models.User;
const {statusAuth} = require('../config/var.config');
const { generateJwtToken } = require('../config/jwt.config');
const moment = require('moment');

class AuthController {

    static login = async (req, res) => {
        const {email, password} = req.body;
        if (!(email && password)) {
            res.status(400).send({message:'Invalid Field Data!'});
        }
        const user = await UserModel.attempt({email,password});
        switch(user) {
            case statusAuth[0]:
                return res.status(404).send({ message: "User Not found." });
            break;
            case statusAuth[1]:
                res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            break;
            default:
                let token = generateJwtToken({id:user.id});
                return res.status(200).send({
                    success: true,
                    data: user,
                    token: token,
                    message: "Successfully Login."
                });
        }

    };

    static logout = async (req, res) => {
        res.status(200).send({message: 'You are on the logout page'});
    };

    static register = async (req, res) => {
        let { name, email, password , gender , dob } = req.body;
        let data = {name, email, password , gender , dob};
        data.dob = moment(dob, "YYYY/MM/DD");
        UserModel.create(data)
        .then(data => {
            res.status(200).send('Success Register!');
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error!"
            });
        });
    };

}

module.exports = AuthController