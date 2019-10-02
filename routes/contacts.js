const controller = require('../controllers/contacts');
const validateToken = require('../utils').validateToken;

module.exports = (router) => {
  router.route('/contacts')
  	.post(controller.add)
    .get(controller.getAll);
  router.route('/contacts/:id')
    .get(controller.show)
    .delete(controller.delete)
    .put(controller.update);
  router.route('/contacts/import')
    .post(controller.import);
};