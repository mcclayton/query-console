import { h, Component } from 'preact';
import './styles.scss'

export default class Button extends Component {
  render() {
    return (
      <button onClick={this.props.onClick} className="button">
        {this.props.children}
      </button>
    );
  }
};
