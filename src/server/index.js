const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const routes = require('./routes.js');
const configUtil = require('./configUtil');
const QueryTracker = require('./queryTracker');
const app = express();
const argv = require('minimist')(process.argv.slice(2));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

routes(app);

let config;
try {
  config = configUtil.getConfig();
} catch (err) {
  console.error(err.stack);
  process.exit(1);
}

// Now start the server
const port = argv['p'] || argv['port'] || 3006;

const server = app.listen(port, function() {
  console.log('API Server running...');
});

const trackers = config.query_trackers;
console.log(`Starting ${trackers.length} query trackers...`);
trackers.forEach((qt) => {
  const tracker = new QueryTracker(qt.service, qt.log_path, qt.regexes);
  tracker.start();
});
