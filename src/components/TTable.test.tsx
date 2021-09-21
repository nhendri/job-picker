import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { testJobData } from './interfaces/IJobInterface';
import Table, { ITableProps } from './Table';

const testTableProps: ITableProps = {
    clickEvent: (e: React.SyntheticEvent) => console.log(e),
    headers: ['test1', 'test2', 'test3'],
    jobSelected: false,
    keys: {
        left: ['title'],
        mid: ['location', 'branch'],
        right: ['contact', 'email']
    },
    rowSelected: 'testRow',
    tableData: [testJobData]    
};

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Table {...testTableProps} />, div);
    ReactDOM.unmountComponentAtNode(div);
});