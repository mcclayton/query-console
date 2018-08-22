const fs = require("fs");

const LOG_FILE_PATH = './queries.log';

function appendToLog(data) {
  const stream = fs.createWriteStream(LOG_FILE_PATH, { flags: 'a+' });
  stream.write(data + "\n");
  stream.end();
}

function clearLog() {
  const stream = fs.createWriteStream(LOG_FILE_PATH, { flags: 'w' });
  fs.writeFile(LOG_FILE_PATH, '', () => {
    console.log('Log cleared.')
  });
}

function getLogData(errorCb, successCb) {
  fs.readFile(LOG_FILE_PATH, "utf8", (err, data) => {
    if (err) {
      errorCb(err);
    } else {
      const stringifiedEntries = data.split('\n').reduce((result, line) => {
        if (line) {
          result.push(line);
        }
        return result;
      }, []);
      const json = "[" + stringifiedEntries.join(',') + "]";
      successCb(json);
    }
  });
}

module.exports = {
  appendToLog: appendToLog,
  clearLog: clearLog,
  getLogData: getLogData,
};
