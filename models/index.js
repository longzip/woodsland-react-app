"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(file => {
    const model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// sequelize
//   .sync({
//     force: true
//   })
//   .then(() => {
//     //Settings
//     db.User.bulkCreate(require("../data/Users"));
//     db.Uom.bulkCreate(require("../data/Uoms"));
//     //
//     db.Product.bulkCreate(require("../data/Products"));
//     db.Workcenter.bulkCreate(require("../data/Workcenters"));
//     //Sales
//     db.Contact.bulkCreate(require("../data/Contacts"));
//     // db.Order.bulkCreate(require("../data/Orders"));
//     // db.OrderLine.bulkCreate(require("../data/OrderLines"));
//     //Mpr
//     db.Routing.bulkCreate(require("../data/Routings"));
//     db.RoutingWorkcenter.bulkCreate(require("../data/RoutingWorkcenters"));
//     db.Production.bulkCreate(require("../data/Productions"));
//   });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
