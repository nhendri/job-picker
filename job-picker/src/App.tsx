import * as React from 'react';
import './App.scss';

import { IJobInterface } from './components/IJobInterface';

import JobViewer from './components/JobViewer';

import logo from './logo.svg';

import { jobsData } from './fakeData/fakeData';

interface IAppState {
  isLoading: boolean;
  error: {
    isErrored: boolean;
    errorMsg?: string;
  };
  data?: Array<IJobInterface>;
};

class App extends React.Component<any, IAppState> {

  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: true,
      error: {
        isErrored: false,
        errorMsg: undefined
      },
      data: undefined
    };
  }

  public componentDidMount(): void {
    const loadedAppState: IAppState = {
      ...this.state,
      isLoading: false,
      error: {
        isErrored: false,
        errorMsg: undefined
      },
      data: jobsData.jobs
    };
    this.setState({ ...loadedAppState });
  }

  public render(): JSX.Element {
    if (this.state.isLoading) {
      return (
        <div className='cuLoading'>LOADING</div>
      )
    };
    if (this.state.error.isErrored) {
      return (
        <div className='cuError'>{this.state.error.isErrored}</div>
      )
    };
    if (this.state.data) {
      return (
        <div className='App'>
          <JobViewer data={this.state.data} />
        </div>
      )
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
       </p>
      </div>
    );
  }
}
export default App;
