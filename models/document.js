"use strict";
module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define(
    "Document",
    {
      name: DataTypes.STRING,
      fileUrl: DataTypes.STRING,
      note: DataTypes.TEXT
    },
    {}
  );
  Document.associate = models => {
    Document.belongsTo(models.Contact);
  };
  return Document;
};
