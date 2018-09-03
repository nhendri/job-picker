import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { testJobData } from './interfaces/IJobInterface';
import JobViewer, { IJobViewerProps } from './JobViewer';


const testData: IJobViewerProps = {
    data: [testJobData]
};

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<JobViewer {...testData} />, div);
    ReactDOM.unmountComponentAtNode(div);
});