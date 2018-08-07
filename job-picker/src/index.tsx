import 'core-js/es6/map';
import 'core-js/es6/set';

import 'raf/polyfill';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App, { IAppProps } from './App';
import './index.scss';
//import registerServiceWorker from './registerServiceWorker';

const appProps: IAppProps = { appTitle: 'Job Viewer' }

ReactDOM.render(
  <App {...appProps} />,
  document.getElementById('spJobPickerRoot') as HTMLElement
);
//registerServiceWorker();