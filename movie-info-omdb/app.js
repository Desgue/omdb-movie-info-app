const express = require("express"),
  bodyParser = require("body-parser"),
  request = require("request"),
  port = process.env.PORT || 8080,
  app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// Index Route
app.get("/", (req, res) => {
  res.redirect("/home");
});

// Home ROUTE
app.get("/home", (req, res) => {
  res.render("index");
});



// Home/Results Route
app.get("/home/results", (req, res) => {
  let searchTerm = req.query.search;

  let url = "http://www.omdbapi.com/?s=" + searchTerm + "&apikey=thewdb";
  request(url, (err, response, body) => {
    try {
      if (!err && response.statusCode == 200) {
        let data = JSON.parse(body);

        res.render("home", { data: data });
      }
    } catch (err) {
      console.log(err);
    }
  });
});

// Movie Info Route
app.get("/info", (req, res) => {
  let id = req.query.movieID;
  let idUrl = "http://www.omdbapi.com/?i=" + id + "&plot=full&apikey=thewdb";

  request(idUrl, (err, response, body) => {
    try {
      if (!err && response.statusCode == 200) {
        let data = JSON.parse(body);

        res.render("info", { data: data });
      }
    } catch (err) {
      console.log(err);
    }
  });
});

app.listen(port, () => {
  console.log("Server Started at port: " + port);
});
