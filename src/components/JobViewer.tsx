// import statements
import * as React from 'react';
import { IJobInterface, testJobData } from './interfaces/IJobInterface';
import './JobViewer.scss';
import { IJobSummaryProps, JobSummaryAnimated } from './SFComponents/JobSummary';
import TableFilters, { IMenuOptions, ITableFilterProps } from './SFComponents/TableFilters';
import Table, { ITableProps } from './Table';

// Exported default component props
export interface IJobViewerProps {
    data: IJobInterface[];
}

interface IMenuFilters {
    applied: boolean;
    selectedCity: string | null;
    selectedDept: string | null;
    filteredData?: IJobInterface[];
}

// not-exported default class internal state
interface IJobVewerState {
    isLoading: boolean;
    menuState: {
        menuOptions: IMenuOptions;
        visible: boolean;
        filters: IMenuFilters;
    };
    jobSummaryState: {
        visible: boolean;
        selectedJob: IJobInterface;
        selectedJobID?: string | null;
    };
}

// class
export default class JobViewer extends React.Component<IJobViewerProps,
    IJobVewerState> {
    private noSelection: string = '--all--';
    constructor(props: IJobViewerProps) {
        super(props);
        this.state = {            
            isLoading: true,
            jobSummaryState: {                
                selectedJob: testJobData,
                selectedJobID: null,
                visible: false
            },
            menuState: {                
                filters: {
                    applied: false,
                    filteredData: undefined,
                    selectedCity: this.noSelection,
                    selectedDept: this.noSelection                
                },
                menuOptions: {
                    arrCityDropdown: [],
                    arrDeptDropdown: []
                },
                visible: true
            }            
        };
        this.menuDropdownEvent = this.menuDropdownEvent.bind(this);
        this.menuResetEvent = this.menuResetEvent.bind(this);
        this.tableClickRowEvent = this.tableClickRowEvent.bind(this);
        this.jobSummaryCloseEvent = this.jobSummaryCloseEvent.bind(this);
    }

    // lifecycle methods
    public componentDidMount(): void {
        this.setState({
            ...this.state,
            isLoading: false,
            menuState: {
                ...this.state.menuState,
                menuOptions: this.setMenuOptions()
            }
        });
    }

    public render(): JSX.Element {
        const cols: number[] = [4, 8];
        const tableFilterProps: ITableFilterProps = {
            dropdownChoices: this.state.menuState.menuOptions,
            dropdownEvent: this.menuDropdownEvent,
            filters: {                
                applied: this.state.menuState.filters.applied,
                city: this.state.menuState.filters.selectedCity,
                defaultText: this.noSelection,
                dept: this.state.menuState.filters.selectedDept
            },            
            resetEvent: this.menuResetEvent
        };
        const tableProps: ITableProps = {
            clickEvent: this.tableClickRowEvent,
            headers: [
                'Title', 'Department', 'City'
            ],
            jobSelected: this.state.jobSummaryState.visible,
            keys: {
                left: ['title'],
                mid: ['department'],
                right: ['location', 'city']
            },                        
            rowSelected: this.state.jobSummaryState.selectedJobID,
            tableData: this.state.menuState.filters.filteredData || this.props.data            
        };

        const jobSummaryProps: IJobSummaryProps = {
            closeEvent: this.jobSummaryCloseEvent,
            selectedJob: { ...this.state.jobSummaryState.selectedJob }            
        };

        return (
            <div className='ms-Grid cuJobPicker'>
                <div className='ms-Grid-row'>
                    <div
                        className={`ms-Grid-col ms-sm12 ms-lg${cols[0]} ms-xl${cols[0]} ms-xxl${cols[0]} cuJobPickerLeft`}>{this.state.jobSummaryState.visible
                            ? <JobSummaryAnimated {...jobSummaryProps} />
                            : <TableFilters {...tableFilterProps} />}</div>
                    <div
                        className={`ms-Grid-col ms-sm12 ms-lg${cols[1]} ms-xl${cols[1]} ms-xxl${cols[1]} cuJobPickerRight`}><Table {...tableProps} /></div>
                </div>
            </div>
        )
    }


    // internal methods
    protected setMenuOptions(): IMenuOptions {
        const arrCityDropdown: string[] = this.props.data.map(el => el.location.city).filter((el, ind, self) => self.indexOf(el) === ind).sort();
        const arrDeptDropdown: string[] = this.props.data.map(el => el.department).filter((el, ind, self) => self.indexOf(el) === ind).sort();
        arrCityDropdown.unshift(this.noSelection);
        arrDeptDropdown.unshift(this.noSelection);
        return { 'arrCityDropdown': arrCityDropdown, 'arrDeptDropdown': arrDeptDropdown };
    }

    // child prop methods
    protected menuDropdownEvent(e: React.SyntheticEvent): void {
        const target = e.target as HTMLInputElement;
        const filters: IMenuFilters = {
            ...this.state.menuState.filters,
            applied: true,
            selectedCity: this.state.menuState.filters.selectedCity,
            selectedDept: this.state.menuState.filters.selectedDept
        };
        target.id === 'cuArrCities' ? filters.selectedCity = target.value : null;
        target.id === 'cuArrDepartments' ? filters.selectedDept = target.value : null;
        let newData: IJobInterface[];
        if (filters.selectedCity !== this.noSelection && filters.selectedDept === this.noSelection) {
            newData = this.props.data.filter(el => el.location.city === filters.selectedCity);
            filters.filteredData = newData;
        } else if (filters.selectedCity === this.noSelection && filters.selectedDept != this.noSelection) {
            newData = this.props.data.filter(el => el.department === filters.selectedDept);
            filters.filteredData = newData;
        } else if (filters.selectedCity != this.noSelection && filters.selectedDept != this.noSelection) {
            newData = this.props.data.filter(el => el.location.city === filters.selectedCity && el.department === filters.selectedDept);
            filters.filteredData = newData;
        };
        this.setState({ ...this.state, menuState: { ...this.state.menuState, filters: { ...filters } } });
    }

    protected menuResetEvent(e: React.SyntheticEvent): void {
        const filters: IMenuFilters = {
            ...this.state.menuState.filters,
            applied: false,
            filteredData: undefined,
            selectedCity: this.noSelection,
            selectedDept: this.noSelection            
        };
        this.setState({ ...this.state, menuState: { ...this.state.menuState, filters: { ...filters } } });
    }

    protected tableClickRowEvent(e: React.SyntheticEvent): void {
        const target = e.target as HTMLInputElement;
        const parentOfTarget = target.parentElement as HTMLInputElement;
        console.log(parentOfTarget.id);
        // const jobSelected: IJobInterface = this.props.data.filter(el => el.guid === parentOfTarget.id)[0];
        // console.log(jobSelected);
        this.setState({
            ...this.state, jobSummaryState: {
                ...this.state.jobSummaryState,                
                selectedJob: this.props.data.filter(el => el.guid === parentOfTarget.id)[0],
                selectedJobID: parentOfTarget.id,
                visible: true
            }
        })
    }

    protected jobSummaryCloseEvent(e: React.SyntheticEvent): void {
        this.setState({
            ...this.state, jobSummaryState: {
                ...this.state.jobSummaryState,                
                selectedJob: testJobData,
                selectedJobID: null,
                visible: false
            }
        })
    }
}