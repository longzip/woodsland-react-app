const controller = require('../controllers/uoms');
const validateToken = require('../utils').validateToken;

module.exports = (router) => {
  router.route('/uoms')
  	.post(controller.add)
    .get(controller.getAll);
  router.route('/uoms/:id')
    .get(controller.show)
    .delete(controller.delete)
    .put(controller.update);
  router.route('/uoms/import')
    .post(controller.import);
};