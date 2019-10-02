"use strict";
module.exports = (sequelize, DataTypes) => {
  const Workorder = sequelize.define(
    "Workorder",
    {
      nextWorkOrderId: DataTypes.INTEGER,
      productUom: DataTypes.STRING,
      factor: DataTypes.INTEGER
    },
    {}
  );
  Workorder.associate = function(models) {
    Workorder.belongsTo(models.Workcenter);
    Workorder.belongsTo(models.Production);
    Workorder.belongsTo(models.Product);
    Workorder.hasMany(models.WorkcenterProductivity);
  };
  return Workorder;
};
