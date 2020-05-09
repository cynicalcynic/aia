const Sequelize = require('sequelize');
const sequelize = require('../db/db.js');
const {Container} = require('typedi');

const Model = Sequelize.Model;
class User extends Model {}
User.init({
    uuid : {
      type : Sequelize.UUID,
      allowNull : false,
      primaryKey : true
    },
    first_name : {
        type : Sequelize.STRING(64),
        allowNull : false
    },
    last_name : {
        type : Sequelize.STRING(64),
        allowNull : false
    },
    email : {
        type: Sequelize.STRING(64),
        allowNull : false,
        unique : true
    },
    password_hash : {
        type: Sequelize.STRING(128),
        allowNull : false
    }
}, {
    sequelize,
    modelName: 'user'
    // options
});

Container.set(User, User);

module.exports = User;