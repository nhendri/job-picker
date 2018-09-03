import * as React from 'react';
import * as ReactDOM from 'react-dom';
import TableRow, { ITableRowProps } from './TableRow';

const tableRowProps: ITableRowProps = {
    header: true,
    rowClass: 'cuRowClass',
    rowEvent: (e: React.SyntheticEvent) => console.log(e),
    rowID: 'cuRowID',
    rowValues: {
        left: null,
        mid: null,
        right: null
    },    
    sorting: {
        sortDir: null,
        sortedCol: null                
    }    
};

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TableRow {...tableRowProps} />, div);
    ReactDOM.unmountComponentAtNode(div);
});