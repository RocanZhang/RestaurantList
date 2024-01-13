const express = require("express");
const { engine } = require("express-handlebars");
const app = express();
const port = 3000;
const restaurants = require("./public/jsons/restaurant.json").results;

//設定 Express 的 view engine 是用 .hbs (代替handlebars)
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.redirect("/search");
  // res.render("index", { restaurants })
});

app.get("/search", (req, res) => {
  const keyword = req.query.keyword?.trim();
  const matchedRestaurants = keyword
    ? restaurants.filter((res) =>
        Object.values(res).some((property) => {
          if (typeof property === "string") {
            return property.toLowerCase().includes(keyword.toLowerCase());
          } else {
            return false;
          }
        })
      )
    : restaurants;
  res.render("index", { restaurants: matchedRestaurants, keyword });
});

// app.get("/search", (req, res) => {
//   if (!req.query.keywords) {
//     return res.redirect("/");
//   }

//   const keywords = req.query.keywords;
//   const keyword = req.query.keywords.trim().toLowerCase();

//   const filterrestaurants = restaurants.filter(
//     (data) =>
//       data.name.toLowerCase().includes(keyword) ||
//       data.category.includes(keyword)
//   );

//   res.render("index", { restaurants: filterrestaurants, keywords });
// });

app.get("/restaurants/:id", (req, res) => {
  const id = req.params.id;
  const restaurant = restaurants.find(
    (restaurant) => restaurant.id.toString() === id
  );
  res.render("detail", { restaurant });
});

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`);
});
