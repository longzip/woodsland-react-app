const controller = require('../controllers/workcenterproductivities');
const validateToken = require('../utils').validateToken;

module.exports = (router) => {
  router.route('/workcenter-productivities')
  	.post(controller.add)
    .get(controller.getAll);
  router.route('/workcenter-productivities/:id')
    .get(controller.show)
    .delete(controller.delete)
    .put(controller.update);
  router.route('/workcenter-productivities/import')
    .post(controller.import);
};