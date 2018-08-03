import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App, { IAppProps } from './App';
import './index.scss';
import registerServiceWorker from './registerServiceWorker';

const appProps: IAppProps = { appTitle: 'Job Viewer' }

ReactDOM.render(
  <App {...appProps} />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
