const controller = require("../controllers/productions");
const validateToken = require("../utils").validateToken;

module.exports = router => {
  router
    .route("/productions")
    .post(controller.add)
    .get(controller.getAll);
  router.route("/productions/:id/todo").get(controller.todo);
  router
    .route("/productions/:id")
    .get(controller.show)
    .delete(controller.delete)
    .put(controller.update);
  router.route("/productions/import").post(controller.import);
};
