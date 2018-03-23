import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Root from './root.js'
import ERouter from './router'

import './index.css';

// Root.getRoot(() => {
    ReactDOM.render(
        <ERouter/>,
    document.getElementById('root'));
// })

registerServiceWorker();
