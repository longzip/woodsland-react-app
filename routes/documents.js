const controller = require("../controllers/documents");
const validateToken = require("../utils").validateToken;
const uploadFile = require("../uploadFile");

module.exports = router => {
  router
    .route("/documents")
    .post(uploadFile.single("uploadFile"), controller.add)
    .get(controller.getAll);
  router
    .route("/documents/:id")
    .get(controller.show)
    .delete(controller.delete)
    .put(uploadFile.single("uploadFile"), controller.update);
  router.route("/documents/import").post(controller.import);
};
