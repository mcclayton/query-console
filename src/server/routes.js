const cors = require("cors");
const logUtil = require("./logUtil");
const configUtil = require("./configUtil");

const corsOptionsDelegate = (req, callback) => {
  const whitelist = ['http://localhost:3005'];

  let corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};

const appRouter = (app) => {
  app.options('*', cors());

  app.get("/services", cors(corsOptionsDelegate), function(req, res) {
    let config;
    try {
      config = configUtil.getConfig();
      const serviceNames = config.query_trackers.map(qt => qt.service);
      res.json(serviceNames);
    } catch(err) {
      res.json([]);
    }
  });

  app.get("/logs", cors(corsOptionsDelegate), function(req, res) {
    logUtil.getLogData((err) => {
      res.json([]);
    }, (data) => {
      var logs = JSON.parse(data);
      res.json(logs);
    });
  });

  app.delete("/logs", cors(corsOptionsDelegate), function(req, res) {
    logUtil.clearLog();
    res.json([]);
  });
}

module.exports = appRouter;
