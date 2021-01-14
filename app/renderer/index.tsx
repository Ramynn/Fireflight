import React from 'react';
import ReactDOM from 'react-dom';
import {AppProvider} from './providers';
import {DOMElements} from './constants';
import './styles/dark-theme.less';

ReactDOM.render(<AppProvider />, DOMElements.root);
