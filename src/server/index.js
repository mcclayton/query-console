const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const routes = require("./routes.js");
const configUtil = require("./configUtil");
const QueryTracker = require("./queryTracker");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

routes(app);

let config;
try {
  config = configUtil.getConfig();
} catch(err) {
  throw new Error('Error occurred when retrieving config.', err);
}

// Now start the server using the config options
const port = config.server_port || 3006;

const server = app.listen(port, function() {
  console.log("Server running on port:", server.address().port);
});

const trackers = config.query_trackers;
console.log(`Starting ${trackers.length} query trackers...`);
trackers.forEach((qt) => {
  const tracker = new QueryTracker(
    qt.service,
    qt.log_path,
    qt.regexes
  );
  tracker.start();
});
