import { Provider } from 'react-redux';
import store from '../redux/store';
import Routes from './Routes'

function Root() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default Root;
