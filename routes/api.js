const express = require("express");
const router = express.Router();

const postsController = require("../controllers/API/postsController.js");

const { catchErrors } = require("../handlers/errorHandlers");

router.get("/posts", catchErrors(postsController.index));

module.exports = router;
