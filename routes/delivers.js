const controller = require('../controllers/delivers');
const validateToken = require('../utils').validateToken;

module.exports = (router) => {
  router.route('/delivers')
  	.post(controller.add)
    .get(controller.getAll);
  router.route('/delivers/:id')
    .get(controller.show)
    .delete(controller.delete)
    .put(controller.update);
  router.route('/delivers/import')
    .post(controller.import);
};