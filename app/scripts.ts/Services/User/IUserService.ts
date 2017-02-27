export interface User {
    Id: number;
    LoginName: string;
    Title: string;
    Email: string;
}

export interface IUserService {
    GetSiteUsers(): Promise<User[]>;
    GetGroupUsers(groupId: number): Promise<User[]>;
}