import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './history'
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import ERouter from './router'
import './style/common.less'

ReactDOM.render(
<ERouter/>
, document.getElementById('root'));
registerServiceWorker();
