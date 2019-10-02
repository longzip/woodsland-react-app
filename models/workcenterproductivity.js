"use strict";
module.exports = (sequelize, DataTypes) => {
  const WorkcenterProductivity = sequelize.define(
    "WorkcenterProductivity",
    {
      qtyProduced: DataTypes.INTEGER,
      productUom: DataTypes.STRING,
      factor: DataTypes.INTEGER
    },
    {}
  );
  WorkcenterProductivity.associate = function(models) {
    WorkcenterProductivity.belongsTo(models.Workcenter);
    WorkcenterProductivity.belongsTo(models.Workorder);
    WorkcenterProductivity.belongsTo(models.Product);
    WorkcenterProductivity.belongsTo(models.User);
  };
  return WorkcenterProductivity;
};
