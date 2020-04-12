import React, {Component} from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import { loadUser } from './redux/actions/authActions';
import Home from './components/home';
 
class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <div className="container">
          <Home />
        </div>
      </Provider>
    )
  }
}

export default App;