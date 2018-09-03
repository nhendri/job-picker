import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { testJobData } from '../interfaces/IJobInterface';
import JobSummary, { IJobSummaryProps } from './JobSummary';


const testJobSummaryProps: IJobSummaryProps = {
    closeEvent: (e: React.SyntheticEvent) => console.log(e),
    selectedJob: testJobData    
};

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <JobSummary {...testJobSummaryProps} />, div);
    ReactDOM.unmountComponentAtNode(div);
});