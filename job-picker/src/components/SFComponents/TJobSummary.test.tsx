import * as React from 'react';
import * as ReactDOM from 'react-dom';
import JobSummary, {IJobSummaryProps} from './JobSummary';
import {testJobData} from '../interfaces/IJobInterface';

const testJobSummaryProps : IJobSummaryProps = {
    ...testJobData,
    closeEvent: (e : React.SyntheticEvent) => console.log(e)
};

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <JobSummary {...testJobSummaryProps}/>, div);
    ReactDOM.unmountComponentAtNode(div);
});