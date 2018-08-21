import { h, Component } from 'preact';
import './styles.scss'

export default class LogRow extends Component {
  render() {
    const { service, query, timestamp } = this.props;
    return (
      <div className="log-row">
        <h4>{`Service: ${service} -- ${timestamp}`}</h4>
        <p>{query}</p>
      </div>
    );
  }
};
