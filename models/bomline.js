"use strict";
module.exports = (sequelize, DataTypes) => {
  const BomLine = sequelize.define(
    "BomLine",
    {
      productQty: DataTypes.INTEGER,
      productUom: DataTypes.STRING,
      operationId: DataTypes.INTEGER
    },
    {}
  );
  BomLine.associate = function(models) {
    BomLine.belongsTo(models.Bom);
    BomLine.belongsTo(models.Routing);
    BomLine.belongsTo(models.Product);
  };
  return BomLine;
};
