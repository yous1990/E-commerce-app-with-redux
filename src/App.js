import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import Navbar from './components/Navbar';
import Products from './components/Products';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Navbar/>
        <Products/>
      </div>
    </Provider>
  );
}

export default App;