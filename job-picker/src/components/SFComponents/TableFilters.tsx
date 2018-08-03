import * as React from 'react';

import './TableFilters.scss';

export interface IMenuOptions {
    arrCityDropdown: Array<string>;
    arrDeptDropdown: Array<string>;
}

export interface ITableFilterProps {
    dropdownChoices: IMenuOptions;
    filters: {
        applied: boolean;
        city: string | null;
        dept: string | null;
    };
    dropdownEvent: (e: React.SyntheticEvent) => void;
    resetEvent: (e: React.SyntheticEvent) => void;
}

const TableFilters: React.SFC<ITableFilterProps> = (props: ITableFilterProps) => {
    const cols: Array<number> = [4, 8];
    return (
        <div className='cuMenu'>
            <div className='ms-Grid'>
                <div className='ms-Grid-row cuMenuChoiceRow'>
                    <div className={`ms-Grid-col ms-sm12 ms-lg${cols[0]} ms-xl${cols[0]} ms-xxl${cols[0]} cuMenuLabel`}>City:</div>
                    <div className={`ms-Grid-col ms-sm12 ms-lg${cols[1]} ms-xl${cols[1]} ms-xxl${cols[1]} cuMenuOptions`}>
                        <select id='cuArrCites' onChange={props.dropdownEvent}>
                            {props.dropdownChoices.arrCityDropdown.map((el, ind) => <option key={ind} value={el} selected={el === props.filters.city ? true : false} >{el}</option>)}
                        </select>
                    </div>
                </div>
                <div className='ms-Grid-row cuMenuChoiceRow'>
                    <div className={`ms-Grid-col ms-sm12 ms-lg${cols[0]} ms-xl${cols[0]} ms-xxl${cols[0]} cuMenuLabel`}>Dept:</div>
                    <div className={`ms-Grid-col ms-sm12 ms-lg${cols[1]} ms-xl${cols[1]} ms-xxl${cols[1]} cuMenuOptions`}>
                        <select id='cuArrDepartments' onChange={props.dropdownEvent}>
                            {props.dropdownChoices.arrDeptDropdown.map((el, ind) => <option key={ind} value={el} selected={el === props.filters.dept ? true : false} >{el}</option>)}
                        </select>
                    </div>
                </div>
                <div className='ms-Grid-row'>
                    <div className='ms-Grid-col ms-sm12'>
                        <button onClick={props.resetEvent}>RESET FILTERS</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TableFilters;