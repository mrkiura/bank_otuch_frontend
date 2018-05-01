import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from "react-router-dom";
import App from './App';


const Landing = () => (
  <Router>
    <div>
      <App />
    </div>
  </Router>
);


ReactDOM.render( <Landing />, document.getElementById('root'));
registerServiceWorker();
