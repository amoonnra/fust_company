import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals';
import bootstrap from 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter } from 'react-router-dom';
import createStore from './store/createStore';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));

const store = createStore();

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

reportWebVitals();
