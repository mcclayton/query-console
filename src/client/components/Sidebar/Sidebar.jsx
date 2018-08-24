import { h, Component } from 'preact';
import cx from 'classnames';
import ServiceTabViewer from '../ServiceTabViewer';
import Header from '../Header';
import Badge from '../Badge';
import logo from '../../assets/logo.png';
import './styles.scss';

export default class Sidebar extends Component {
  _getLogCount(service, logs) {
    return logs.filter((l) => l.service === service).length;
  }

  render() {
    const { logs, services, currTab, setTab } = this.props;

    const currService =
      services.indexOf(currTab) !== -1 ? currTab : services[0];

    return (
      <div className="sidebar">
        <div className="sidebar__header">🚀 Services</div>
        <div>
          {services.map((s) => (
            <div
              className={cx('service', { selected: s === currService })}
              onClick={() => setTab(s)}
            >
              {s}
              <Badge>{this._getLogCount(s, logs)}</Badge>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
