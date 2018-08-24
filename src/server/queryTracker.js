const Tail = require('tail').Tail;
const logUtil = require('./logUtil');

const DEFAULT_QUERY_REGEX = {
  expression: '.*(select|create|update|delete|insert)\\b',
  ignore_case: true
};

// For removing color, etc. escape codes from text
const ESCAPE_CODE_REGEX = /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g;

class QueryTracker {
  constructor(service, path, regexes) {
    this.path = path;
    this.tail = new Tail(path);
    this.service = service || 'default';
    const regexConfigs =
      regexes && regexes.length > 0 ? regexes : [DEFAULT_QUERY_REGEX];
    this.regexes = regexConfigs.map((r) => this._getRegex(r));
  }

  start() {
    const configString = `
      \t• Service: ${this.service}
      \t• Log Path: ${this.path}
      \t• Query Regexes: ${JSON.stringify(
        this.regexes.map((r) => r.toString())
      )},
    `;
    console.log('→ Query Tracker Started With Config:', configString);

    this.tail.on('line', (data) => {
      const cleanedData = data.replace(ESCAPE_CODE_REGEX, '');
      if (this._isQuery(cleanedData)) {
        console.log(`->> QUERY (${this.service}):\n`, cleanedData);
        const entry = this._createLogEntry(cleanedData);
        logUtil.appendToLog(entry);
      }
    });

    this.tail.on('error', function(error) {
      console.log('ERROR: ', error);
    });
  }

  stop() {
    this.tail.unwatch();
  }

  _getRegex(regexConfig) {
    const flags = regexConfig.ignore_case === true ? 'gi' : 'g';
    return new RegExp(regexConfig.expression, flags);
  }

  _createLogEntry(query) {
    return JSON.stringify({
      query: query,
      timestamp: new Date().toISOString(),
      service: this.service
    });
  }

  _isQuery(data) {
    let isQuery = false;
    this.regexes.forEach((regex) => {
      if (regex.test(data)) {
        isQuery = true;
      }
    });
    return isQuery;
  }
}

module.exports = QueryTracker;
