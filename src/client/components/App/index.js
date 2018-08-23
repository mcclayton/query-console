import App from './App';
import StateContainer from './StateContainer';
import { withTabState } from './TabState';

export default StateContainer(withTabState(App));
