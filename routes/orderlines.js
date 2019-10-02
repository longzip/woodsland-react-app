const controller = require('../controllers/orderlines');
const validateToken = require('../utils').validateToken;

module.exports = (router) => {
  router.route('/orderlines')
  	.post(controller.add)
    .get(controller.getAll);
  router.route('/orderlines/:id')
    .get(controller.show)
    .delete(controller.delete)
    .put(controller.update);
  router.route('/orderlines/import')
    .post(controller.import);
};