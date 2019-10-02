const controller = require("../controllers/excels");
const validateToken = require("../utils").validateToken;
const uploadImage = require("../uploadExcel");

module.exports = router => {
  router
    .route("/excels")
    .post(uploadImage.single("excelFile"), controller.save)
    .get(controller.read);
};
