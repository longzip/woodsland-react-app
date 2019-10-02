"use strict";
module.exports = (sequelize, DataTypes) => {
  const RoutingWorkcenter = sequelize.define(
    "RoutingWorkcenter",
    {
      name: DataTypes.STRING,
      sequence: DataTypes.INTEGER,
      note: DataTypes.TEXT,
      worksheet: DataTypes.STRING,
      active: DataTypes.BOOLEAN
    },
    {}
  );
  RoutingWorkcenter.associate = function(models) {
    RoutingWorkcenter.belongsTo(models.Routing);
    RoutingWorkcenter.belongsTo(models.Workcenter);
  };
  return RoutingWorkcenter;
};
