const controller = require('../controllers/routingworkcenters');
const validateToken = require('../utils').validateToken;

module.exports = (router) => {
  router.route('/routingworkcenters')
  	.post(controller.add)
    .get(controller.getAll);
  router.route('/routingworkcenters/:id')
    .get(controller.show)
    .delete(controller.delete)
    .put(controller.update);
  router.route('/routingworkcenters/import')
    .post(controller.import);
};