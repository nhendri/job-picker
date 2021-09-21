import * as React from 'react';
import * as ReactDOM from 'react-dom';
import TableFilters, { ITableFilterProps } from './TableFilters';

const testTableFilterProps: ITableFilterProps = {
    dropdownChoices: {
        arrCityDropdown: ['test1', 'test2'],
        arrDeptDropdown: ['test3', 'test4']
    },
    dropdownEvent: (e: React.SyntheticEvent) => console.log(e),
    filters: {
        applied: false,
        city: 'test1',
        defaultText: '--all--',                
        dept: 'test2'
    },    
    resetEvent: (e: React.SyntheticEvent) => console.log(e)
};

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TableFilters {...testTableFilterProps} />, div);
    ReactDOM.unmountComponentAtNode(div);
})