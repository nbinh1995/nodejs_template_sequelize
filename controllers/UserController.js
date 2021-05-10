const db = require('../models/index');
const UserModel = db.sequelize.models.User;
const bcrypt = require('bcryptjs');
class UserController{

    static list = async (req, res) => {
        const {page,q} = req.body;
        UserModel.findAndCountAll(
            {
                limit: 5,
                offset: 0,
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
        let data = { name, email, password , gender , dob } = req.body;
        data.password = bcrypt.hashSync(data.password, 8);
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
        let data = { name, email , gender , dob } = req.body;

        if(req.password){
            data.password = bcrypt.hashSync(req.body.password, 8);
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