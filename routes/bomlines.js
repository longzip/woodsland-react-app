const controller = require('../controllers/bomlines');
const validateToken = require('../utils').validateToken;

module.exports = (router) => {
  router.route('/bomlines')
  	.post(controller.add)
    .get(controller.getAll);
  router.route('/bomlines/:id')
    .get(controller.show)
    .delete(controller.delete)
    .put(controller.update);
  router.route('/bomlines/import')
    .post(controller.import);
};