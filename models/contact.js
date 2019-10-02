"use strict";
module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define(
    "Contact",
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      addressLine: DataTypes.STRING,
      city: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      state: DataTypes.STRING,
      note: DataTypes.TEXT
    },
    {}
  );
  Contact.associate = function(models) {
    Contact.belongsTo(models.User);
    Contact.hasMany(models.Order);
  };
  return Contact;
};
