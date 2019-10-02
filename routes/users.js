const controller = require("../controllers/users");
const validateToken = require("../utils").validateToken;

module.exports = router => {
  router
    .route("/users")
    .post(controller.add)
    .get(controller.getAll);

  router
    .route("/users/:id")
    .get(controller.show)
    .delete(controller.delete)
    .put(controller.update);

  router.route("/login").post(controller.login);
};
