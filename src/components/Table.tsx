import * as React from 'react';

import { IJobInterface } from './interfaces/IJobInterface';

import TableRow, { ITableRowProps } from './SFComponents/TableRow';

import './Table.scss';

// Exported default component props
export interface ITableProps {
    headers: [string, string, string];
    keys: {
        left: string[];
        mid: string[];
        right: string[];
    };
    tableData: IJobInterface[];
    jobSelected?: boolean | null;
    rowSelected?: string | null;
    clickEvent: (e: React.SyntheticEvent) => void;
}

interface ISortingInterface {
    sorted: boolean;
    sortCol?: string | null;
    sortDir?: string | null;
    sortedData?: IJobInterface[] | null;
}

// non-exported internal component state
interface ITableState {
    visible: boolean;
    sorting: ISortingInterface;
}

// class
export default class Table extends React.Component<ITableProps, ITableState>{
    // private noEntry: string = 'There are no matching results!';
    constructor(props: ITableProps) {
        super(props);
        this.state = {
            sorting: {                
                sortCol: null,
                sortDir: null,
                sorted: false,
                sortedData: null
            },
            visible: true
            
        };
        this.sortColumnEvent = this.sortColumnEvent.bind(this);
    }

    // lifecycle methods
    public componentWillReceiveProps(nextProps: ITableProps): void {
        if (this.props.tableData !== nextProps.tableData) {
            this.setState({ sorting: { ...this.state.sorting, sorted: false, sortCol: null, sortDir: null, sortedData: null } });
        };
    };

    public render(): JSX.Element {
        return (
            <div className={`cuTable${this.props.jobSelected ? ' fade' : ''}`}>
                <div className='ms-Grid'>
                    {this.createArrHeader()}
                    {this.createDataRows()}
                </div>
            </div>
        )
    }

    // internal methods
    protected tableRowValueParser(keyArr: string[], dataObj: IJobInterface): string {
        let targetVal: any;
        keyArr.forEach((el, ind) => {
            if (ind === 0) {
                targetVal = dataObj[el];
            } else {
                targetVal = targetVal[el];
            };
        });
        return targetVal;
    }

    protected createArrHeader(): JSX.Element {
        const tableHeaderRowProps: ITableRowProps = {
            header: true,
            rowClass: 'cuTitleRow',
            rowEvent: this.sortColumnEvent,
            rowID: 'cuTitleRowID',
            rowValues: {
                left: this.props.headers[0],
                mid: this.props.headers[1],
                right: this.props.headers[2]
            },
            sorting: {
                sortDir: this.state.sorting.sortDir,
                sortedCol: this.state.sorting.sortCol                
            }                        
        };
        return <TableRow {...tableHeaderRowProps} />;
    }

    protected createDataRows(): JSX.Element[] {
        const arrRows: JSX.Element[] = [];
        if (this.props.tableData.length > 0) {
            const d: IJobInterface[] = this.state.sorting.sortedData || this.props.tableData;
            d.forEach((el, ind) => {
                const tableDataRowProps: ITableRowProps = {
                    header: false,
                    rowClass: `cuContentRow${this.props.rowSelected === el.guid ? ' selected' : ''}`,                    
                    rowEvent: this.props.clickEvent,
                    rowID: el.guid,
                    rowValues: {
                        left: this.tableRowValueParser(this.props.keys.left, el),
                        mid: this.tableRowValueParser(this.props.keys.mid, el),
                        right: this.tableRowValueParser(this.props.keys.right, el)
                    },
                    sorting: {
                        sortDir: this.state.sorting.sortDir,
                        sortedCol: this.state.sorting.sortCol                        
                    }                    
                };
                arrRows.push(<TableRow key={ind}{...tableDataRowProps} />);
            });
        } else {
            const tableDataRowNoDataProps: ITableRowProps = {
                header: false,
                rowClass: 'cuNoDataRow',
                rowValues: {
                    left: 'There are no matching results!',
                    mid: null,
                    right: null
                },
                sorting: {}
            }
            arrRows.push(<TableRow key='noDataRow' {...tableDataRowNoDataProps} />);
        }
        return arrRows;
    }

    // child prop methods
    protected sortColumnEvent(e: React.SyntheticEvent): void {
        const target = e.target as HTMLInputElement;
        if (this.props.tableData.length > 0) {
            let sortedData: IJobInterface[];
            const sortingStuff: ISortingInterface = {
                ...this.state.sorting,                
                sortCol: target.id.substring(2),
                sortDir: this.state.sorting.sortDir === 'asc' && this.state.sorting.sortCol === target.id.substring(2) ? 'desc' : 'asc',
                sorted: true
            };
            this.props.headers.forEach((el, ind) => {
                const sortingKey: string[] = ind === 0 ? this.props.keys.left : (ind === 1 ? this.props.keys.mid : this.props.keys.right)
                if (el === sortingStuff.sortCol) {
                    switch (sortingStuff.sortDir) {
                        case 'asc':
                            sortedData = this.props.tableData.sort((first, second) => (this.tableRowValueParser(sortingKey, first)).localeCompare(this.tableRowValueParser(sortingKey, second)));
                            sortingStuff.sortedData = sortedData;
                            break;
                        case 'desc':
                            sortedData = this.props.tableData.sort((second, first) => (this.tableRowValueParser(sortingKey, first)).localeCompare(this.tableRowValueParser(sortingKey, second)));
                            sortingStuff.sortedData = sortedData;
                            break;
                        default:
                            break;
                    }
                }
            });
            this.setState({ sorting: sortingStuff });
        }
    }     
}