"use strict";
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      description: DataTypes.STRING,
      note: DataTypes.TEXT,
      active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
      version: { type: DataTypes.STRING, allowNull: false, defaultValue: "1" },
      stage: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "New"
      },
      dateFinished: DataTypes.DATE
    },
    {}
  );
  Order.associate = function(models) {
    Order.belongsTo(models.Contact);
    Order.belongsTo(models.User);
    Order.hasMany(models.Inventory);
    Order.hasMany(models.Deliver);
    Order.hasMany(models.Document);
  };
  return Order;
};
