import { h, Component } from 'preact';
import LogList from '../LogList';
import './styles.scss';

export default class LogRow extends Component {
  getTabView(tabId) {
    return tabId || 'default';
  }

  splitLogsByService(services, logs) {
    const organizedLogs = {};
  }

  render() {
    const { logs, services, currTab } = this.props;

    const currService = services.indexOf(currTab) !== -1 ? currTab : services[0];
    const filteredLogs = logs.filter(l => l.service === currService);

    return (
      <div className="tab-viewer">
        <LogList logs={filteredLogs} service={currService} />
      </div>
    );
  }
};
