"use strict";
module.exports = (sequelize, DataTypes) => {
  const Production = sequelize.define(
    "Production",
    {
      name: DataTypes.STRING,
      origin: DataTypes.STRING,
      productDimension: DataTypes.STRING,
      productQty: DataTypes.INTEGER,
      productUom: DataTypes.STRING,
      factor: DataTypes.INTEGER,
      datePlannedStart: DataTypes.DATEONLY,
      datePlannedFinished: DataTypes.DATEONLY,
      dateStart: DataTypes.DATEONLY,
      dateFinished: DataTypes.DATEONLY,
      priority: DataTypes.INTEGER,
      state: DataTypes.STRING,
      availability: DataTypes.STRING
    },
    {}
  );
  Production.associate = function(models) {
    Production.belongsTo(models.OrderLine);
    Production.belongsTo(models.Contact);
    Production.belongsTo(models.Bom);
    Production.belongsTo(models.Routing);
    Production.belongsTo(models.Product);
  };
  return Production;
};
