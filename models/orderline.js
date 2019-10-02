"use strict";
module.exports = (sequelize, DataTypes) => {
  const OrderLine = sequelize.define(
    "OrderLine",
    {
      name: DataTypes.STRING,
      productDimension: DataTypes.STRING,
      productSpec: DataTypes.STRING,
      productUom: DataTypes.STRING,
      productUomQty: DataTypes.INTEGER,
      productPrice: DataTypes.INTEGER,
      state: DataTypes.STRING,
      note: DataTypes.TEXT
    },
    {}
  );
  OrderLine.associate = function(models) {
    OrderLine.belongsTo(models.Order);
    OrderLine.belongsTo(models.Product);
    OrderLine.belongsTo(models.Contact);
  };
  return OrderLine;
};
