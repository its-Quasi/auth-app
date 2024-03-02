export interface LoginResponse {
    _id: string;
    email: string;
    name: string;
    isActive: boolean;
    roles: string[];
    __v : number
    token: string
}