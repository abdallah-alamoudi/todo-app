require("dotenv").config();

const express = require("express");
const path = require("path");
const methodOverride = require("method-override");

const TodoRouter = require("./routes/TodoRouter");
const { globalErrorHandler } = require("./middlewares/errorHandler");
const { connectToDB } = require("./data/db");
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

// connect to db then start server
connectToDB()
  .then(() => {
    app.listen(port, async () => {
      console.log("server is up on port " + port);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
  });
