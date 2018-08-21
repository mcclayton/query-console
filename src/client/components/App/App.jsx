import { h, Component } from 'preact';
import LogRow from '../LogRow';
import './styles.scss';

export default class App extends Component {
  componentDidMount() {
    this.fetchLogs = this.fetchLogs.bind(this);
    this.clearLogs = this.clearLogs.bind(this);
    this.interval = setInterval(this.fetchLogs, 1000);
    this.fetchLogs();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  fetchLogs() {
    this.props.fetchLogs(
      this.props.onError,
      this.props.fetchLogsSuccess,
    );
  }

  clearLogs() {
    this.props.clearLogs(
      this.props.onError,
      this.props.clearLogsSuccess,
    );
  }

  render() {
    const { logs, error, loading } = this.props;
    return (
      <div className="app">
        { error && (<div>{error}</div>) }
        <button onClick={this.clearLogs}>Clear Logs</button>
        {logs.map((log) => (
          <LogRow
            service={log.service}
            timestamp={log.timestamp}
            query={JSON.stringify(log.query)}
          />
        ))}
      </div>
    );
  }
}
