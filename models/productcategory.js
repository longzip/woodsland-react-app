"use strict";
module.exports = (sequelize, DataTypes) => {
  const ProductCategory = sequelize.define(
    "ProductCategory",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    },
    {}
  );
  ProductCategory.associate = function(models) {
    ProductCategory.hasMany(models.Product);
  };
  return ProductCategory;
};
