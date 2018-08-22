import { h, Component } from 'preact';
import LogRow from '../LogRow';
import './styles.scss'

export default class LogList extends Component {
  render() {
    const { logs, service } = this.props;
    if (!logs || logs.length === 0) {
      return (
        <div className='empty-message'>
          {`No Queries To Show For Service: ${service}`}
        </div>
      );
    }
    return (
      <div className="log-list">
        {logs.map((log, idx) => (
          <LogRow
            key={`${log.query}-${log.timestamp}`}
            number={idx + 1}
            service={log.service}
            timestamp={log.timestamp}
            query={JSON.stringify(log.query)}
          />
        ))}
      </div>
    );
  }
};
