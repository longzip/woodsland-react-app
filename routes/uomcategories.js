const controller = require('../controllers/uomcategories');
const validateToken = require('../utils').validateToken;

module.exports = (router) => {
  router.route('/uomcategories')
  	.post(controller.add)
    .get(controller.getAll);
  router.route('/uomcategories/:id')
    .get(controller.show)
    .delete(controller.delete)
    .put(controller.update);
  router.route('/uomcategories/import')
    .post(controller.import);
};