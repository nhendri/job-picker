import * as React from 'react';
//import statements
import { IJobInterface, testJobData } from './interfaces/IJobInterface';
import './JobViewer.scss';
import { JobSummaryAnimated, IJobSummaryProps } from './SFComponents/JobSummary';
//JobSummary,
import TableFilters, { IMenuOptions, ITableFilterProps } from './SFComponents/TableFilters';
import Table, { ITableProps } from './Table';

//Exported default component props
export interface IJobViewerProps {
    data: Array<IJobInterface>;
}

interface IMenuFilters {
    applied: boolean;
    selectedCity: string | null;
    selectedDept: string | null;
    filteredData?: Array<IJobInterface>;
}

//not-exported default class internal state
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

//class
export default class JobViewer extends React.Component<IJobViewerProps,
    IJobVewerState> {
    private noSelection: string = '--all--';
    constructor(props: IJobViewerProps) {
        super(props);
        this.state = {
            isLoading: true,
            menuState: {
                menuOptions: {
                    arrCityDropdown: [],
                    arrDeptDropdown: []
                },
                visible: true,
                filters: {
                    applied: false,
                    selectedCity: this.noSelection,
                    selectedDept: this.noSelection,
                    filteredData: undefined
                }
            },
            jobSummaryState: {
                visible: false,
                selectedJob: testJobData,
                selectedJobID: null
            }
        };
        this.menuDropdownEvent = this.menuDropdownEvent.bind(this);
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
        return { arrCityDropdown: arrCityDropdown, arrDeptDropdown: arrDeptDropdown };
    }

    //child prop methods
    protected menuDropdownEvent(e: React.SyntheticEvent): void {
        const target = e.target as HTMLInputElement;
        let filters: IMenuFilters = {
            ...this.state.menuState.filters,
            applied: true,
            selectedCity: this.state.menuState.filters.selectedCity,
            selectedDept: this.state.menuState.filters.selectedDept
        };
        target.id === 'cuArrCities' ? filters.selectedCity = target.value : null;
        target.id === 'cuArrDepartments' ? filters.selectedDept = target.value : null;
        let newData: Array<IJobInterface>;
        if (filters.selectedCity != this.noSelection && filters.selectedDept === this.noSelection) {
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
            selectedCity: this.noSelection,
            selectedDept: this.noSelection,
            filteredData: undefined
        };
        this.setState({ ...this.state, menuState: { ...this.state.menuState, filters: { ...filters } } });
    }

    protected tableClickRowEvent(e: React.SyntheticEvent): void {
        let target = e.target as HTMLInputElement;
        let parentOfTarget = target.parentElement as HTMLInputElement;
        console.log(parentOfTarget.id);
        //const jobSelected: IJobInterface = this.props.data.filter(el => el.guid === parentOfTarget.id)[0];
        //console.log(jobSelected);
        this.setState({
            ...this.state, jobSummaryState: {
                ...this.state.jobSummaryState,
                visible: true,
                selectedJob: this.props.data.filter(el => el.guid === parentOfTarget.id)[0],
                selectedJobID: parentOfTarget.id
            }
        })
    }

    protected jobSummaryCloseEvent(e: React.SyntheticEvent): void {
        this.setState({
            ...this.state, jobSummaryState: {
                ...this.state.jobSummaryState,
                visible: false,
                selectedJob: testJobData,
                selectedJobID: null
            }
        })
    }

    //lifecycle methods
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
        const cols: Array<number> = [4, 8];
        const tableFilterProps: ITableFilterProps = {
            dropdownChoices: this.state.menuState.menuOptions,
            filters: {
                defaultText: this.noSelection,
                applied: this.state.menuState.filters.applied,
                city: this.state.menuState.filters.selectedCity,
                dept: this.state.menuState.filters.selectedDept
            },
            dropdownEvent: this.menuDropdownEvent,
            resetEvent: this.menuResetEvent
        };
        const tableProps: ITableProps = {
            headers: [
                'Title', 'Department', 'City'
            ],
            keys: {
                left: ['title'],
                mid: [
                    'location', 'city'
                ],
                right: ['department']
            },
            tableData: this.state.menuState.filters.filteredData || this.props.data,
            jobSelected: this.state.jobSummaryState.visible,
            rowSelected: this.state.jobSummaryState.selectedJobID,
            clickEvent: this.tableClickRowEvent
        };

        const jobSummaryProps: IJobSummaryProps = {
            selectedJob: { ...this.state.jobSummaryState.selectedJob },
            closeEvent: this.jobSummaryCloseEvent
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
}