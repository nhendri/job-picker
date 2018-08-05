import * as React from 'react';
import {IJobInterface} from '../interfaces/IJobInterface';
import './JobSummary.scss';

export interface IJobSummaryProps {
    selectedJob: IJobInterface;
    closeEvent : (e : React.SyntheticEvent) => void;
}

const JobSummary : React.SFC < IJobSummaryProps > = (props : IJobSummaryProps) => {
    let img : string;
    switch (props.selectedJob.department) {
        case 'Customer Service':
            img = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1040656/branch_img.jpg';
            break;
        case 'Information Services':
            img = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1040656/computer_img.jpg';
            break;
        default:
            img = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1040656/corporate_img.jpg';
            break;
    }
    return (
        <div className='cuJobSummary' id={`job_${props.selectedJob.guid}`}>
            <div className='cuCloseButton' onClick={props.closeEvent}>X</div>
            <div className='ms-Grid'>
                <div className='ms-Grid-row'>
                    <div className='ms-Grid-col ms-sm12'>
                        <img src={img}/>
                    </div>
                </div>
            </div>
            <div className='ms-Grid-row cuTitle'>
                <div className='ms-Grid-col ms-sm12'>
                    <h3>{props.selectedJob.title}</h3>
                </div>
            </div>
            <div className='ms-Grid-row cuCity'>
                <div className='ms-Grid-col ms-sm12'>{`${props.selectedJob.location.city}${props.selectedJob.location.branch != 0
                        ? ` (Br ${props.selectedJob.location.branch})`
                        : ''}`}</div>
            </div>
            <div className='ms-Grid-row cuDepartment'>
                <div className='ms-Grid-col ms-sm12'>
                    <em>Department</em>: {props.selectedJob.department}</div>
            </div>
            <div className='ms-Grid-row cuManager'>
                <div className='ms-Grid-col ms-sm12'>
                    <em>Manager</em>: <a
                        href={`mailto:${props.selectedJob.contact.email}?subject=[JobInqury] regarding open ${props.selectedJob.title} position`}>{props.selectedJob.contact.name}</a>
                </div>
            </div>
            <div className='ms-Grid-row cuDescription'>
                <div className='ms-Grid-col ms-sm12'>{props.selectedJob.description}</div>
            </div>
        </div>
    )
}

export default JobSummary;