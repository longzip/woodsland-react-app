const controller = require('../controllers/inventories');
const validateToken = require('../utils').validateToken;

module.exports = (router) => {
  router.route('/inventories')
  	.post(controller.add)
    .get(controller.getAll);
  router.route('/inventories/:id')
    .get(controller.show)
    .delete(controller.delete)
    .put(controller.update);
  router.route('/inventories/import')
    .post(controller.import);
};