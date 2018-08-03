import * as React from 'react';
import * as ReactDOM from 'react-dom';
import TableRow, { ITableRowProps } from './TableRow';

const tableRowProps: ITableRowProps = {
    header: true,
    rowClass: 'cuRowClass',
    rowID: 'cuRowID',
    sorting: {
        sortedCol: null,
        sortDir: null
    },
    rowValues: {
        left: null,
        mid: null,
        right: null
    },
    rowEvent: (e: React.SyntheticEvent) => console.log(e)
};

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TableRow {...tableRowProps} />, div);
    ReactDOM.unmountComponentAtNode(div);
});