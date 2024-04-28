const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const app = express();
const Blog = require("./models/blog");
const blogRoute = require("./router/blogRoute");
const path = require("path");

const url =
  "mongodb+srv://jys-user:user123@atlascluster.rrwsazf.mongodb.net/express-app";

mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to Database");
    app.listen(process.env.PORT || 3000, () =>
      console.log("Your server is running port 3000")
    );
  })
  .catch((err) => console.log(err));

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  Blog.find()
    .then((blogs) => res.render("index", { blogs }))
    .catch((err) => console.log(err));
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.use("/blogs", blogRoute);

app.use(function (req, res) {
  res.status(404).render("notFound", {
    title: "Not Found Page",
    message: "Oop! We found nothing",
  });
});
