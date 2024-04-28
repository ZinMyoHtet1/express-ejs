const express = require("express");
const blogController = require("../controller/blogControl");

const router = express.Router();

router.get("/", blogController.blog_all_get);

router.get("/create", blogController.blog_create_get);

router.post("/create", blogController.blog_create_post);

router.get("/:id", blogController.blog_details_get);

router.delete("/:id", blogController.blog_details_delete);

module.exports = router;
