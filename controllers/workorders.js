const {
  Workorder,
  Production,
  Product,
  Workcenter,
  WorkcenterProductivity
} = require("../models/index");
const Joi = require("@hapi/joi");
const { Op } = require("sequelize");
const moment = require("moment");

function validate(data) {
  const schema = {
    name: Joi.string().required(),
    workcenterId: Joi.number(),
    productionId: Joi.number(),
    productId: Joi.number(),
    productionAvailability: Joi.string(),
    qtyProduced: Joi.number(),
    qtyProducing: Joi.number(),
    state: Joi.string(),
    datePlanned_start: Joi.date(),
    datePlanned_finished: Joi.date(),
    dateStart: Joi.date(),
    dateFinished: Joi.date(),
    operationId: Joi.number(),
    nextWorkOrderId: Joi.number(),
    productionDate: Joi.date()
  };
  return Joi.validate(data, schema);
}

module.exports = {
  add: (req, res) => {
    let result = {};
    let status = 201;

    let { error, value } = validate(req.body);

    if (error) {
      console.log(error);
      status = 500;
      result.status = status;
      result.error = error;
      return res.status(status).send(result);
    }

    Workorder.create(value)
      .then(item => {
        result.status = status;
        result.result = item;
        return res.status(status).send(result);
      })
      .catch(err => {
        status = 500;
        result.status = status;
        result.error = err;
        return res.status(status).send(result);
      });
  },

  show: (req, res) => {
    let result = {};
    let status = 200;

    Workorder.findByPk(req.params.id)
      .then(item => {
        result.status = status;
        result.result = item;
        return res.status(status).send(result);
      })
      .catch(err => {
        status = 500;
        result.status = status;
        result.error = err;
        return res.status(status).send(result);
      });
  },

  delete: (req, res) => {
    let result = {};
    let status = 200;

    Workorder.findByPk(req.params.id)
      .then(item => {
        result.status = status;
        result.result = item.destroy();
        return res.status(status).send(result);
      })
      .catch(err => {
        status = 500;
        result.status = status;
        result.error = err;
        return res.status(status).send(result);
      });
  },

  import: (req, res) => {
    let result = {};
    let status = 200;
    // console.log(req.body);
    Workorder.bulkCreate(req.body)
      .then(affectedRows => {
        result.status = status;
        result.result = affectedRows;
        return res.status(status).send(result);
      })
      .catch(err => {
        status = 500;
        result.status = status;
        result.error = err;
        return res.status(status).send(result);
      });
    // Workorder.sync({
    //   force: true
    // })
    //   .then(() => {

    //   })
    //   .catch(err => {
    //     status = 500;
    //     result.status = status;
    //     result.error = err;
    //     return res.status(status).send(result);
    //   });
  },

  update: (req, res) => {
    let result = {};
    let status = 201;

    let { error, value } = validate(req.body);

    Workorder.update(value, {
      where: {
        id: req.params.id
      }
    })
      .then(affectedRows => {
        result.status = status;
        result.result = affectedRows;
        return res.status(status).send(result);
      })
      .catch(err => {
        status = 500;
        result.status = status;
        result.error = err;
        return res.status(status).send(result);
      });
  },

  getAll: (req, res) => {
    // Uom.sync();
    let result = {};
    let status = 200;
    console.log(req.query.name);
    // find multiple entries
    Workorder.findAll({
      include: [
        { model: Product },
        { model: Production },
        { model: Workcenter },
        { model: WorkcenterProductivity }
      ],
      offset: req.query.offset || 0,
      limit: req.query.limit || 0,
      where: req.query.ProductionId
        ? {
            [Op.and]: [
              {
                ProductionId: req.query.ProductionId,
                createdAt: {
                  [Op.lte]:
                    moment(req.query.dateFinished).endOf("day") || moment(),
                  [Op.gte]:
                    moment(req.query.dateStart).startOf("day") ||
                    moment("2019-08-29")
                }
              }
            ]
          }
        : {},
      Workorder: req.query.sort ? req.query.sort : [["createdAt", "ASC"]]
    })
      .then(uoms => {
        // uoms will be an array of all Uom instances
        result.status = status;
        result.result = uoms;
        return res.status(status).send(result);
      })
      .catch(err => {
        status = 500;
        result.status = status;
        result.error = err;
        return res.status(status).send(result);
      });
  }
};
