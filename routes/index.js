const express = require("express")
const router = express.Router()
const indexController = require("../controllers/indexController")

router.use("/timestamp", indexController.timestamp)
router.use("/logs", indexController.logs)

module.exports = router