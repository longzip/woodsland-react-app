const { Document } = require("../models/index");
const { Op } = require("sequelize");
const Joi = require("@hapi/joi");

const validate = values => {
  const schema = {
    name: Joi.string(),
    fileUrl: Joi.string(),
    note: Joi.string(),
    ContactId: Joi.number()
  };
  return Joi.validate(values, schema);
};

module.exports = {
  delete: (req, res) => {
    let result = {};
    let status = 200;

    Document.findByPk(req.params.id)
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
  add: (req, res) => {
    const data = Object.assign({}, req.body, { fileUrl: req.file.path });
    let result = {};
    let status = 201;
    console.log(req.file);
    let { error, value } = validate(data);
    if (error) {
      console.log(error);
      status = 500;
      result.status = status;
      result.error = error;
      return res.status(status).send(result);
    }

    Document.create(value)
      .then(newDocument => {
        result.status = status;
        result.result = newDocument;
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

    Uom.findByPk(req.params.id)
      .then(uom => {
        result.status = status;
        result.result = uom;
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
    Document.bulkCreate(req.body)
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

  update: (req, res) => {
    let result = {};
    let status = 201;
    const data = Object.assign({}, req.body, { fileUrl: req.file.path });
    let { error, value } = validate(data);

    Document.update(value, {
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
    let result = {};
    let status = 200;
    Document.findAll({
      offset: req.query.offset || 0,
      limit: req.query.limit || 0,
      where: req.query.contactId
        ? {
            ContactId: {
              [Op.like]: req.query.contactId
            }
          }
        : {},
      order: req.query.sort ? req.query.sort : [["createdAt", "DESC"]]
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
