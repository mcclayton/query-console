import { h, Component } from 'preact';
import './styles.scss'

export default class LogRow extends Component {
  render() {
    const { service, query, timestamp, number } = this.props;
    return (
      <div className="log-row">
        <div className="number">
          {number}
        </div>
        <div className="content">
          <div className="query">{query}</div>
          <div className="metadata">
            <div>{`Service: ${service}`}</div>
            <div>{timestamp}</div>
          </div>
        </div>
      </div>
    );
  }
};
