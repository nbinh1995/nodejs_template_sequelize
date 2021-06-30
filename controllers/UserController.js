const db = require('../models/index');
const UserModel = db.sequelize.models.User;
const bcrypt = require('bcryptjs');
const salt  = bcrypt.genSaltSync(10);
const moment = require('moment');
const { pageSize } = require('../config/var.config')

class UserController{

    static list = async (req, res) => {
        const {page} = req.body;
        const offset = page * pageSize.user;
        const limit = pageSize.user;

        UserModel.findAndCountAll(
            {
                limit: limit,
                offset: offset,
            }
        )
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error!"
            });
        });

    };
    
    static show = async (req, res) => {
        const id = req.params.id;
        UserModel.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error!"
            });
        });
    };
    
    static store = async (req, res) => {
        let { name, email, password , gender , dob } = req.body;
        let data = { name, email, password , gender , dob };
        data.dob = moment(dob, "YYYY/MM/DD");
        UserModel.create(data)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error!"
            });
        });
    };
    
    static update = async (req, res) => {
        const id = req.params.id;
        // let { name , gender , dob } = req.body;
        let data = {...req.body};
        if(req.body.dob){
            data.dob = moment(dob, "YYYY/MM/DD");
        }
        
        if(req.body.password){
            data.password = req.body.password;
        }

        UserModel.update(data, {
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Updated successfully."
                });
            } else {
                res.send({
                    message: 'Cannot update'
                });
            }
        }).catch(err => {
            res.status(500).send({
                message: "Some error"
            });
        });
    };
    
    static delete = async (req, res) => {
        const id = req.params.id;
        UserModel.destroy({
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete"
            });
        });

    };
};

module.exports = UserController;