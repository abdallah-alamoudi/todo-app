const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
require("dotenv").config();

const TodoRouter = require("./routes/TodoRouter");
const { globalErrorHandler } = require("./middlewares/errorHandler");
const app = express();
const port = process.env.PORT || 3000;
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./public")));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.redirect("/todos");
});
app.use("/todos", TodoRouter);

app.use(globalErrorHandler);
app.listen(port, () => {
  console.log("server is up on port " + port);
});
