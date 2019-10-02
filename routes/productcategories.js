const controller = require('../controllers/productcategories');
const validateToken = require('../utils').validateToken;

module.exports = (router) => {
  router.route('/productcategories')
  	.post(controller.add)
    .get(controller.getAll);
  router.route('/productcategories/:id')
    .get(controller.show)
    .delete(controller.delete)
    .put(controller.update);
  router.route('/productcategories/import')
    .post(controller.import);
};