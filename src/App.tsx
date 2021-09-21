import * as React from 'react';
import './App.scss';

import { IJobInterface } from './components/interfaces/IJobInterface';

import JobViewer from './components/JobViewer';

export interface IAppProps {
  appTitle: string | null;
}

interface IAppState {
  isLoading: boolean;
  error: {
    isErrored: boolean;
    errorMsg?: string;
  };
  data?: IJobInterface[];
};

class App extends React.Component<IAppProps, IAppState> {

  constructor(props: IAppProps) {
    super(props);
    this.state = {
      data: undefined,
      error: {
        errorMsg: undefined,
        isErrored: false        
      },
      isLoading: true,
      
    };
  }

  // lifecycle methods
  public componentDidMount(): void {
    this.returnJobData();
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
            {this.state.error.isErrored ? <div className='cuError'>{this.state.error.errorMsg}</div> : null}
            {this.state.data ? <JobViewer data={this.state.data} /> : null}
          </div>
        </div>
      </div>
    )
  }

  // non lifecycle methods
  protected returnJobData(): void {
    fetch('https://my-json-server.typicode.com/nhendri/typicodeJsonPlaceholder/jobs').then(
      result => {
        return result.json();
      }
    ).then(
      result => {
        if (!result.length) {
          const loadedAppState: IAppState = {
            ...this.state,
            data: undefined,
            error: {
              errorMsg: 'no data! also, please style me at some point to be a useful (but comforting) error message...',
              isErrored: true              
            },
            isLoading: false
            
          };
          this.setState({ ...loadedAppState });
        } else {
          const loadedAppState: IAppState = {
            ...this.state,
            data: result,
            error: {
              errorMsg: undefined,
              isErrored: false              
            },
            isLoading: false                       
          };
          this.setState({ ...loadedAppState });
        }
      }
    ).catch(
      error => {
        const loadedAppState: IAppState = {
          ...this.state,
          data: undefined,
          error: {
            errorMsg: `Error Text: "${error}" - I should create, like, error logging for this...`,
            isErrored: true            
          },
          isLoading: false          
        };
        this.setState({ ...loadedAppState });
      }
    )
  }  
}
export default App;