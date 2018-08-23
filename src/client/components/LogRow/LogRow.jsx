import { h, Component } from 'preact';
import './styles.scss'

export default class LogRow extends Component {
  render() {
    const { service, query, timestamp, number } = this.props;
    let cleanedQuery = unescape(query.replace(/^"(.+(?="$))"$/, '$1'));
    cleanedQuery = cleanedQuery.replace(/\\"/g, '');

    return (
      <div className="log-row">
        <div className="number">
          {number}
        </div>
        <div className="content">
          <div className="query">{cleanedQuery}</div>
          <div className="metadata">
            <div>{`Service: ${service}`}</div>
            <div>{timestamp}</div>
          </div>
        </div>
      </div>
    );
  }
};
