const Tail = require('tail').Tail;
const logUtil = require('./logUtil');

const QUERY_REGEX = /^(select|create|update|delete|insert)\b/i;

class QueryTracker {
  constructor(path, service) {
    this.tail = new Tail(path);
    this.service = service || 'default';
  }

  start() {
    console.log('Tracking queries for service:', this.service + '...');

    this.tail.on("line", (data) => {
      if (QUERY_REGEX.test(data)) {
        console.log(`->> QUERY (${this.service}):`, data);
        const entry = this._createLogEntry(data);
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
