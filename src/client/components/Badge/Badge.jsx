import { h, Component } from 'preact';
import './styles.scss';

export default class Badge extends Component {
  render() {
    const { children } = this.props;

    return (
      <div className="badge">
        {children}
      </div>
    );
  }
}
