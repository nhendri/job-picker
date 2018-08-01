import * as React from 'react';
import { IJobInterface } from './IJobInterface';
import './JobViewer.scss';

export interface IJobViewerProps {
    data: Array<IJobInterface>;
}

interface IMenuOptions {
    arrCityDropdown: Array<string>;
    arrDeptDropdown: Array<string>;
}

interface IJobVewerState {
    isLoading: boolean;
    menuState: {
        menuOptions?: IMenuOptions;
        visible: boolean;
        filters: {
            applied: boolean;
            selectedCity?: string;
            selectedDept?: string;
            filteredData?: Array<IJobInterface>
        };
    };
    jobSummaryState: {
        visible: boolean;
        selectedJob?: IJobInterface;
        selectedJobID?: string;
    };
}

/*
interface ITableState{
    tableState: {
        visible: boolean;
        sorting: {
            sorted: boolean;
            sortCol?: string;
            sortDir?: string;
            sortedData?: Array<IJobEntry>;
        };
    };
}

this.state={
    tableState: {
        visible: true,
        sorting: {
            sorted: false,
            sortCol: undefined,
            sortDir: undefined,
            sortedData: undefined
        }
    }
}
*/

class JobViewer extends React.Component<IJobViewerProps, IJobVewerState> {
    private noSelection: string = '--all--';
    constructor(props: IJobViewerProps) {
        super(props);
        this.state = {
            isLoading: true,
            menuState: {
                menuOptions: undefined,
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
                selectedJob: undefined,
                selectedJobID: undefined
            }
        };
    }

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

    public componentDidMount(): void {
        this.setState({ ...this.state, isLoading: false, menuState: { ...this.state.menuState, menuOptions: this.setMenuOptions() } });
    }

    public render(): JSX.Element {
        console.log(this.state);
        return (
            <div className='cuJobPicker'>{this.state.isLoading ? 'LOADING' : this.props.data[0].title}</div>
        )
    }
}

export default JobViewer;