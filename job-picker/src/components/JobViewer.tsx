//import statements
import * as React from 'react';
import { IJobInterface } from './interfaces/IJobInterface';
import './JobViewer.scss';
import TableFilters, { IMenuOptions, ITableFilterProps } from './SFComponents/TableFilters';
import Table, { ITableProps } from './Table';


//Exported default component props
export interface IJobViewerProps {
    data: Array<IJobInterface>;
}

//not-exported default class internal state
interface IJobVewerState {
    isLoading: boolean;
    menuState: {
        menuOptions: IMenuOptions;
        visible: boolean;
        filters: {
            applied: boolean;
            selectedCity: string | null;
            selectedDept: string | null;
            filteredData?: Array<IJobInterface> | null;
        };
    };
    jobSummaryState: {
        visible: boolean;
        selectedJob?: IJobInterface | null;
        selectedJobID?: string | null;
    };
}

//class
export default class JobViewer extends React.Component<IJobViewerProps, IJobVewerState> {
    private noSelection: string = '--all--';
    constructor(props: IJobViewerProps) {
        super(props);
        this.state = {
            isLoading: true,
            menuState: {
                menuOptions: { arrCityDropdown: [], arrDeptDropdown: [] },
                visible: true,
                filters: {
                    applied: false,
                    selectedCity: this.noSelection,
                    selectedDept: this.noSelection,
                    filteredData: null
                }
            },
            jobSummaryState: {
                visible: false,
                selectedJob: null,
                selectedJobID: null
            }
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.menuResetEvent = this.menuResetEvent.bind(this);
        this.tableClickRowEvent = this.tableClickRowEvent.bind(this);
        this.jobSummaryCloseEvent = this.jobSummaryCloseEvent.bind(this);
    }

    //internal methods
    protected setMenuOptions(): IMenuOptions {
        const arrCityDropdown: Array<string> = this.props.data.map(el => el.location.city).filter((el, ind, self) => self.indexOf(el) === ind).sort();
        const arrDeptDropdown: Array<string> = this.props.data.map(el => el.department).filter((el, ind, self) => self.indexOf(el) === ind).sort();
        arrCityDropdown.unshift(this.noSelection);
        arrDeptDropdown.unshift(this.noSelection);
        return {
            arrCityDropdown: arrCityDropdown,
            arrDeptDropdown: arrDeptDropdown
        };
    }

    //child prop methods
    protected menuDropdownEvent(e: React.SyntheticEvent): void {
        console.log(e);
    }

    protected menuResetEvent(e: React.SyntheticEvent): void {
        console.log(e);
    }

    protected tableClickRowEvent(e: React.SyntheticEvent): void {
        let target = e.target as HTMLInputElement;
        let parentOfTarget = target.parentElement as HTMLInputElement;
        console.log(parentOfTarget.id);
    }

    protected jobSummaryCloseEvent(e: React.SyntheticEvent): void {
        console.log(e);
    }

    //lifecycle methods
    public componentDidMount(): void {
        this.setState({ ...this.state, isLoading: false, menuState: { ...this.state.menuState, menuOptions: this.setMenuOptions() } });
    }

    public render(): JSX.Element {
        const cols: Array<number> = [4, 8];
        const tableFilterProps: ITableFilterProps = {
            dropdownChoices: this.state.menuState.menuOptions,
            filters: {
                applied: this.state.menuState.filters.applied,
                city: this.state.menuState.filters.selectedCity,
                dept: this.state.menuState.filters.selectedDept
            },
            dropdownEvent: this.menuDropdownEvent,
            resetEvent: this.menuResetEvent
        };
        const tableProps: ITableProps = {
            headers: ['Title', 'Department', 'City'],
            keys: {
                left: ['title'],
                mid: ['location', 'city'],
                right: ['department']
            },
            tableData: this.state.menuState.filters.filteredData || this.props.data,
            jobSelected: this.state.jobSummaryState.visible,
            rowSelected: this.state.jobSummaryState.selectedJobID,
            clickEvent: this.tableClickRowEvent
        };
        return (
            <div className='ms-Grid cuJobPicker'>
                <div className='ms-Grid-row'>
                    <div className={`ms-Grid-col ms-sm12 ms-lg${cols[0]} ms-xl${cols[0]} ms-xxl${cols[0]} cuJobPickerLeft`} ><TableFilters {...tableFilterProps} /></div>
                    <div className={`ms-Grid-col ms-sm12 ms-lg${cols[1]} ms-xl${cols[1]} ms-xxl${cols[1]} cuJobPickerRight`} ><Table {...tableProps} /></div>
                </div>
            </div>
        )
    }
}