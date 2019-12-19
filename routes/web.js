const express = require("express");
const router = express.Router();

const postsController = require("../controllers/postsController");
const commentsController = require("../controllers/commentsController");

const { catchErrors } = require("../handlers/errorHandlers");

router.get("/", (req, res) => {
  res.redirect("/posts");
})

router.get("/posts", catchErrors(postsController.index));
router.get("/posts/create", postsController.create);
router.post("/posts/create", catchErrors(postsController.store));
router.get("/posts/:slug", catchErrors(postsController.show));
router.get("/posts/:slug/edit", catchErrors(postsController.edit));
router.post("/posts/:slug/edit", catchErrors(postsController.update));
router.post("/posts/:slug/delete", catchErrors(postsController.delete));


router.get("/comments", catchErrors(commentsController.index));
router.post("/posts/:slug/comment", catchErrors(commentsController.store));
router.get("/posts-partial", catchErrors(postsController.searchPosts));

module.exports = router;
