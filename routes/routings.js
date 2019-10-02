const controller = require('../controllers/routings');
const validateToken = require('../utils').validateToken;

module.exports = (router) => {
  router.route('/routings')
  	.post(controller.add)
    .get(controller.getAll);
  router.route('/routings/:id')
    .get(controller.show)
    .delete(controller.delete)
    .put(controller.update);
  router.route('/routings/import')
    .post(controller.import);
};