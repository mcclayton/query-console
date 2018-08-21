const cors = require("cors");
const logUtil = require("./logUtil");

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

  app.get("/logs", cors(corsOptionsDelegate), function(req, res) {
    logUtil.getLogData((err) => {
      throw err;
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
