import { h, render } from 'preact';
import App from './components/App';

let root;
const init = () => {
  root = render(<App />, document.body, root);
};

init();
