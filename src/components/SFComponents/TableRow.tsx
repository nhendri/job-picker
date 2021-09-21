import * as React from 'react';

// Exported default component props
export interface ITableRowProps {
    header: boolean;
    rowClass?: string;
    rowID?: string;
    sorting: {
        sortedCol?: string | null;
        sortDir?: string | null;
    };
    rowValues: {
        left: string | number | null;
        mid: string | number | null;
        right: string | number | null;
    };
    rowEvent?: (e: React.SyntheticEvent) => void;
}

// component
const TableRow: React.SFC<ITableRowProps> = (props: ITableRowProps) => {
    const cols: number[] = [5, 4, 3];
    return (
        <div className={props.rowClass}>
            <div className='ms-Grid-row' id={props.rowID || ''} onClick={props.header ? undefined : props.rowEvent}>
                <div className={`ms-Grid-col ms-sm12 ms-lg${cols[0]} ms-xl${cols[0]} ms-xxl${cols[0]} ${props.header ? `cuTitleCol${props.sorting.sortedCol === props.rowValues.left ? ` ${props.sorting.sortDir}` : ''}` : 'cuDataCol cuLeftSide'}`} id={props.header ? `cu${props.rowValues.left}` : undefined} onClick={props.header ? props.rowEvent : undefined} >{props.rowValues.left}</div>
                <div className={`ms-Grid-col ms-sm12 ms-lg${cols[1]} ms-xl${cols[1]} ms-xxl${cols[1]} ${props.header ? `cuTitleCol${props.sorting.sortedCol === props.rowValues.mid ? ` ${props.sorting.sortDir}` : ''}` : 'cuDataCol  cuMiddle'}`} id={props.header ? `cu${props.rowValues.mid}` : undefined} onClick={props.header ? props.rowEvent : undefined} >{props.rowValues.mid}</div>
                <div className={`ms-Grid-col ms-sm12 ms-lg${cols[2]} ms-xl${cols[2]} ms-xxl${cols[2]} ${props.header ? `cuTitleCol${props.sorting.sortedCol === props.rowValues.right ? ` ${props.sorting.sortDir}` : ''}` : 'cuDataCol  cuRightSide'}`} id={props.header ? `cu${props.rowValues.right}` : undefined} onClick={props.header ? props.rowEvent : undefined} >{props.rowValues.right}</div>
            </div>
        </div>
    )
}

export default TableRow;

// ${props.sorting.sortedCol === props.header[0] ? props.sorting.sortDir : ''}