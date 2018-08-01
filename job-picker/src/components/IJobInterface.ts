export interface IJobInterface {
    title: string;
    location: {
        city: string;
        branch: number;
    };
    department: string;
    fullTime: boolean;
    description: string;
    contact: {
        name: string;
        phone: string;
        email: string;
    };
    guid: string;
}

export interface IJobEntrySomeDay {
    title: string;
    location: {
        address: string;
        city: string;
        zip: string;
    };
    department: string;
    fullTime: boolean;
    description: string;
    contact: {
        name: string;
        phone: string;
        email: string;
    };
    jobID: string;
}