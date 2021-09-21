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
    department: {
        deptName: string;
        deptNumber: string | number;
        branch: boolean;
    };
    fullTime: boolean;
    description: string;
    contact: {
        name: string;
        phone: string;
        email: string;
    };
    jobID: string;
}

const testJobData: IJobInterface = {    
    contact: {
        email: 'Tester@tester.test',
        name: 'Tester',
        phone: '123-456-7890'        
    },
    department: 'Test Department',
    description: 'A Test Job',
    fullTime: true,
    guid: '57380e0d-bab1-427d-a48b-085e8adf74af',    
    location: {
        branch: 0,
        city: 'Test City'        
    },
    title: 'Test Job1'
};

export { testJobData };