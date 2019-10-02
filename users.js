'use strict';

const bcrypt = require('bcrypt');
const environment = process.env.NODE_ENV;
const stage = require('../config')[environment];

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  User.beforeSave((user, options) => {
    if(!user.isModified || !user.isNew) { // don't rehash if it's an old user
      
    } else {
      bcrypt.hash(user.password, stage.saltingRounds, function(err, hash) {
        if (err) {
          console.log('Error hashing password for user', user.name);
        } else {
          user.password = hash;
        }
      });
    }
  });
  return User;
};