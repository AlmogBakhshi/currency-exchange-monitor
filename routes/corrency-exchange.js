const router = require("express").Router();
const { getT, getTByID, addT, updateT, deleteT } = require("../controllers");
const CorrencyExchange = require("../models/corrency-exchange");

router.route("/")
    .get((req, res) => getT(req, res, CorrencyExchange))
    .post((req, res) => addT(req, res, CorrencyExchange));

router.route("/:id")
    .get((req, res) => getTByID(req, res, CorrencyExchange, "Corrency Exchange not found"))
    .delete((req, res) => deleteT(req, res, CorrencyExchange, "Corrency Exchange not found"))
    .put((req, res) => updateT(req, res, CorrencyExchange, "Corrency Exchange not found"));

module.exports = router;