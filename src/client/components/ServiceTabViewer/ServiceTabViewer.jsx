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
    const { logs, currTab, services } = this.props;
    const filteredLogs = logs.filter(l => l.service === (currTab || 'Procore'));

    return (
      <div className="tab-viewer">
        {
          services.map((s) => (
            <div style={{ border: '1px solid gray', padding: '1rem' }}>
              {s}
            </div>
          ))
        }
        <LogList logs={logs} service={"DUMMY SERVICE"} />
      </div>
    );
  }
};
