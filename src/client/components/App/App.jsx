import { h, Component } from 'preact';
import ServiceTabViewer from '../ServiceTabViewer';
import Header from '../Header';
import logo from '../../assets/logo.png';
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
        <div className="sidebar">
          Sessions
        </div>
        <div className="main">
          <Header onClearLogs={this.clearLogs} />
          { error && (<div>{error}</div>) }
          <ServiceTabViewer logs={logs} />
        </div>
      </div>
    );
  }
}
