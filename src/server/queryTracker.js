const Tail = require('tail').Tail;
const logUtil = require('./logUtil');

const QUERY_REGEX = /^.*(select|create|update|delete|insert)\b/i;
// For removing color, etc. escape codes from text
const ESCAPE_CODE_REGEX = /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g;

class QueryTracker {
  constructor(path, service) {
    this.tail = new Tail(path);
    this.service = service || 'default';
  }

  start() {
    console.log('Tracking queries for service:', this.service + '...');

    this.tail.on("line", (data) => {
      if (QUERY_REGEX.test(data)) {
        const cleanedData = data.replace(ESCAPE_CODE_REGEX, '');
        console.log(`->> QUERY (${this.service}):`, cleanedData);
        const entry = this._createLogEntry(cleanedData);
        logUtil.appendToLog(entry);
      }
    });

    this.tail.on("error", function(error) {
      console.log('ERROR: ', error);
    });
  }

  stop() {
    this.tail.unwatch();
  }

  _createLogEntry(query) {
    return JSON.stringify({
      query: query,
      timestamp: Math.floor((new Date).getTime() / 1000),
      service: this.service
    });
  }
}

module.exports = QueryTracker;
