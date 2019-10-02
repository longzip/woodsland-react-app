"use strict";
module.exports = (sequelize, DataTypes) => {
  const Uom = sequelize.define(
    "Uom",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    },
    {}
  );
  Uom.associate = function(models) {
    // associations can be defined here
  };
  return Uom;
};
