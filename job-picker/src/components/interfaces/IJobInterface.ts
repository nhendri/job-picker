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
    title: 'Test Job1',
    location: {
        city: 'Test City',
        branch: 0
    },
    department: 'Test Department',
    fullTime: true,
    description: 'A Test Job',
    contact: {
        name: 'Tester',
        phone: '123-456-7890',
        email: 'Tester@tester.test'
    },
    guid: '57380e0d-bab1-427d-a48b-085e8adf74af'
};

export { testJobData };