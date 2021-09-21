import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App, { IAppProps } from './App';

const testAppProps: IAppProps = { appTitle: 'Test App' };

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App {...testAppProps} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
