"use strict";
module.exports = (sequelize, DataTypes) => {
  const Inventory = sequelize.define(
    "Inventory",
    {
      name: DataTypes.STRING,
      productQty: DataTypes.INTEGER
    },
    {}
  );
  Inventory.associate = function(models) {
    Inventory.belongsTo(models.Order);
    Inventory.belongsTo(models.Production);
    Inventory.belongsTo(models.Product);
  };
  return Inventory;
};
