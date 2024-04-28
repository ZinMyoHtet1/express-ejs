const Blog = require("../models/blog");

const blog_all_get = (req, res) => {
  res.redirect("/");
};

const blog_create_get = (req, res) => {
  res.render("blogs/create");
};

const blog_create_post = (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => res.redirect("/blogs"))
    .catch((err) => {
      console.log(err);
      res.status(404).render("notFound", {
        title: "Error",
        message: `${err.message}`,
      });
    });
};

const blog_details_get = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((blog) => res.render("blogs/details", { blog }))
    .catch((err) =>
      res.status(404).render("notFound", {
        title: "Error",
        message: `${err.message}`,
      })
    );
};

const blog_details_delete = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => res.json({ redirect: "/blogs" }))
    .catch((err) => console.log(err));
};

module.exports = {
  blog_all_get,
  blog_create_get,
  blog_create_post,
  blog_details_get,
  blog_details_delete,
};
