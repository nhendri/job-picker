import * as React from 'react';
import './App.scss';

import { IJobInterface } from './components/interfaces/IJobInterface';

import JobViewer from './components/JobViewer';

import { jobsData } from './fakeData/fakeData';

export interface IAppProps {
  appTitle: string | null;
}

interface IAppState {
  isLoading: boolean;
  error: {
    isErrored: boolean;
    errorMsg?: string;
  };
  data?: Array<IJobInterface>;
};

class App extends React.Component<IAppProps, IAppState> {

  constructor(props: IAppProps) {
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

  //non lifecycle methods

  protected getData(): Promise<{}> {
    return new Promise((resolve: any, reject: any) => {
      let AThingIsTrue, AThingIsFalse;
      if (AThingIsTrue) {
        resolve([]);
      }
      if (AThingIsFalse) {
        reject({ error: 'anError' });
      }
    });
  }

  //lifecycle methods
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
    return (
      <div className='ms-Grid cuAppContainer' dir='ltr'>
        <div className='ms-Grid-row cuAppTitleRow'>
          <div className='ms-Grid-col ms-sm12'><h2>{this.props.appTitle}</h2></div>
        </div>
        <div className='ms-Grid-row cuAppContentRow'>
          <div className='ms-Grid-col ms-sm12'>
            {this.state.isLoading ? <div className='cuLoading'>LOADING</div> : null}
            {this.state.error.isErrored ? <div className='cuError'>{this.state.error.isErrored}</div> : null}
            {this.state.data ? <JobViewer data={this.state.data} /> : null}
          </div>
        </div>
      </div>
    )
  }
}
export default App;