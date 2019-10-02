const Joi = require('@hapi/joi');
const xlsx = require('xlsx');
const path = require('path');

function validate(uom) {
  const schema = {
        excelFile: Joi.any().required(),
    };
    return Joi.validate(uom, schema);
}

// let file = path.
module.exports = {
    read: (req, res) => {
        let result = {};
        let status = 201;
        let fileName = path.join(__dirname, "../public/excels/tuan2.xlsx");
        let wb = xlsx.readFile(fileName, {cellDates: true});
        let ws = wb.Sheets['Chung Мат']
        result.status = status;
        result.result = xlsx.utils.sheet_to_json(ws);
        return res.status(status).send(result);
    },

    save: (req, res) => {
        let result = {};
        let status = 200;
        // result.result = req.file.path;
        // console.log(path.join(process.cwd(),req.file.path))
        let wb = xlsx.readFile(path.join(process.cwd(),req.file.path), {cellDates: true});
        let ws = wb.Sheets['Sheet1']
        result.status = status;
        result.result = xlsx.utils.sheet_to_json(ws);
        return res.status(status).send(result);
    },

    store: (req, res) => {

    }

}