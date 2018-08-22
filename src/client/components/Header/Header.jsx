import { h, Component } from 'preact';
import Button from '../Button';
import logo from '../../assets/logo.png';
import './styles.scss';

export default class Header extends Component {
  render() {
    const { onClearLogs } = this.props;
    return (
      <div className="header">
        <div className="header__container">
          <img className="logo" src={logo} />
          <div className="title">Query Console</div>
        </div>
        <div className="header__container">
          <Button onClick={onClearLogs}>Clear Logs</Button>
        </div>
      </div>
    );
  }
}
