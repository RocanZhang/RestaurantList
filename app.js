const express = require("express");
const { engine } = require("express-handlebars");
const app = express();
const port = 3000;

//設定 Express 的 view engine 是用 .hbs (代替handlebars)
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("express app for RestaurantList");
});

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`);
});
