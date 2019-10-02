const controller = require("../controllers/workcenters");
const validateToken = require("../utils").validateToken;

module.exports = router => {
  router
    .route("/workcenters")
    .post(controller.add)
    .get(controller.getAll);
  router
    .route("/workcenters/:id")
    .get(controller.show)
    .delete(controller.delete)
    .put(controller.update);
  router.route("/workcenters/import").post(controller.import);
};
