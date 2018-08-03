import * as React from 'react';
import * as ReactDOM from 'react-dom';
import JobViewer, { IJobViewerProps } from './JobViewer';
import { testJobData } from './interfaces/IJobInterface';

const testData: IJobViewerProps = {
    data: [testJobData]
};

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<JobViewer {...testData} />, div);
    ReactDOM.unmountComponentAtNode(div);
});