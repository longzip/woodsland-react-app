"use strict";
module.exports = (sequelize, DataTypes) => {
  const Routing = sequelize.define(
    "Routing",
    {
      code: DataTypes.STRING,
      name: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
      note: DataTypes.TEXT
    },
    {}
  );
  Routing.associate = function(models) {
    // associations can be defined here
  };
  return Routing;
};
