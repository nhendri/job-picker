import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Table, { ITableProps } from './Table';
import { testJobData } from './interfaces/IJobInterface';

const testTableProps: ITableProps = {
    headers: ['test1', 'test2', 'test3'],
    keys: {
        left: ['title'],
        mid: ['location', 'branch'],
        right: ['contact', 'email']
    },
    tableData: [testJobData],
    jobSelected: false,
    rowSelected: 'testRow',
    clickEvent: (e: React.SyntheticEvent) => console.log(e)
};

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Table {...testTableProps} />, div);
    ReactDOM.unmountComponentAtNode(div);
});