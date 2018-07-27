import React from 'react';
import ReactDOM from 'react-dom';
import './public/style/index.css';
import App from './components/App'
import server from './server';

ReactDOM.render(<App />, document.getElementById('root'));
server();
