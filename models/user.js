'use strict';
const {statusAuth} = require('../config/var.config');
const bcrypt = require('bcryptjs');
const salt  = bcrypt.genSaltSync(10);
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    static async attempt({email ,password}) {
        const auth =await this.findOne({ where: { email: email} });
        if(auth instanceof User){
          const passwordIsValid = bcrypt.compareSync(
            password,
            auth.password
          );
          if(passwordIsValid){
            return auth;
          }else{
            return statusAuth.FAIL_PASSWORD;
          }
          
        }else{
          return statusAuth.FAIL_EMAIL;
        }
    }
  };
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: {type:DataTypes.STRING,
      set(value) {
        this.setDataValue('password',bcrypt.hashSync(value, salt));
      },
    },
    gender: DataTypes.ENUM('male', 'female'),
    dob: DataTypes.DATE,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};

