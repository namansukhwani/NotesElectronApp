import React from 'react';
import Main from './components/mainComponent';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {StoreConfig} from './redux/store';

const store=StoreConfig();

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Main/>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
