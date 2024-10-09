export interface IDomain {
    id?: number;
    name: string;
}

export interface IRole {
    id?: number;
    role_id: 'admin' | 'teacher' | 'student';
    name: string;
}

export interface IStatus {
    id?: number;
    name: string;
    status_type: string;
    customer_cnt?: number;
}

export interface IProperty {
    id?: number;
    name: string;
    property_type: string;
    customer_cnt?: number;
}

export interface IName {
    id: number;
    email: string;
    name: string;
}
