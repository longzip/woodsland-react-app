"use strict";
module.exports = (sequelize, DataTypes) => {
  const Deliver = sequelize.define(
    "Deliver",
    {
      name: DataTypes.STRING,
      productQty: DataTypes.INTEGER
    },
    {}
  );
  Deliver.associate = function(models) {
    Deliver.belongsTo(models.Order);
    Deliver.belongsTo(models.Product);
  };
  return Deliver;
};
