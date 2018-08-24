const fs = require('fs');

function getConfig(errorCb, successCb) {
  const configPath = process.env.CONFIG_PATH;
  if (!fs.existsSync(configPath)) {
    throw new Error(`Cannot locate config file at ${configPath}`);
  }
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  validateConfig(config);
  return config;
}

function validateConfig(configObj) {
  const trackers = configObj.query_trackers;
  if (!trackers || trackers.length === 0) {
    throw new Error('No query trackers present in config file.');
  }

  trackers.forEach((t, idx) => {
    if (!t.service) {
      throw new Error(`
        Query tracker at position '${idx}' does not have a service name.
        Please ensure you provide the 'service' key in the config.
      `);
    } else if (!t.log_path) {
      throw new Error(`
        Query tracker for service '${t.service}' is missing a log file path.
        Please ensure you provide the 'log_path' key in the config.
      `);

      if (!fs.existsSync(t.log_path)) {
        throw new Error(`
          Query tracker for service '${
            t.service
          }' failed to find log file at path: '${t.log_path}'.
          Please ensure you provide a valid 'log_path' key in the config.
        `);
      }
    }
  });
}

module.exports = {
  getConfig: getConfig
};
