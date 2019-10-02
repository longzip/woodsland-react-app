const controller = require('../controllers/workorders');
const validateToken = require('../utils').validateToken;

module.exports = (router) => {
  router.route('/workorders')
  	.post(controller.add)
    .get(controller.getAll);
  router.route('/workorders/:id')
    .get(controller.show)
    .delete(controller.delete)
    .put(controller.update);
  router.route('/workorders/import')
    .post(controller.import);
};