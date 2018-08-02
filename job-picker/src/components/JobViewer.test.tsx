import * as React from 'react';
import * as ReactDOM from 'react-dom';
import JobViewer, { IJobViewerProps } from './JobViewer';
import { IJobInterface } from './IJobInterface';

const testJob: IJobInterface = {
    title: 'Test Job1',
    location: {
        city: 'Test City',
        branch: 0
    },
    department: 'Test Department',
    fullTime: true,
    description: 'A Test Job',
    contact: {
        name: 'Tester',
        phone: '123-456-7890',
        email: 'Tester@tester.test'
    },
    guid: '57380e0d-bab1-427d-a48b-085e8adf74af'
}

const testData: IJobViewerProps = {
    data: [testJob]
};

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<JobViewer {...testData} />, div);
    ReactDOM.unmountComponentAtNode(div);
});