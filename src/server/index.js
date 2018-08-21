const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const routes = require("./routes.js");
const QueryTracker = require("./queryTracker");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

routes(app);

const port = process.env.SERVER_PORT || 3006;

const server = app.listen(port, function() {
  console.log("Server running on port:", server.address().port);
});

const queryTrackers = [
  new QueryTracker(
    "/Users/michaelclayton/Desktop/GitRepos/dev-portal/log/development.log",
    "Developer Portal"
  ),
  new QueryTracker(
    "/Users/michaelclayton/Desktop/GitRepos/procore/log/development.log",
    "Procore"
  ),
  new QueryTracker(
    "/Users/michaelclayton/Desktop/GitRepos/login/log/development.log",
    "Login"
  )
]

queryTrackers.forEach((qt) => qt.start());
