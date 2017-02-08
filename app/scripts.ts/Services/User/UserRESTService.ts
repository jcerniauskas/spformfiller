import { injectable, inject } from "inversify";
import { IUserService, User } from "./IUserService";
import { ISPRestAPI } from "../../SPRestAPI/ISPRestAPI";

interface GroupUserPromises {
    [groupId: number]: Promise<User[]>;
}

@injectable()
export default class UserRESTService implements IUserService {
    public constructor( @inject("ISPRestAPI") private _spRestAPI: ISPRestAPI) {
    }

    private _siteUsers: Promise<User[]>;
    public async GetSiteUsers(): Promise<User[]> {
        if (this._siteUsers === undefined) {
            this._siteUsers = this._spRestAPI.GetSiteUsers().then(restResult => UserRESTService.GetUsersFromRestResult(restResult));
        }

        const users = await this._siteUsers;
        return UserRESTService.FilterSystemUsers(users);
    }

    private _groupUsers: GroupUserPromises = { };
    public async GetGroupUsers(groupId: number): Promise<User[]> {
        if (this._groupUsers[groupId] === undefined) {
            this._groupUsers[groupId] = this._spRestAPI.GetGroupUsers(groupId).then(restResult => UserRESTService.GetUsersFromRestResult(restResult));
        }

        const users = await this._groupUsers[groupId];
        return UserRESTService.FilterSystemUsers(users);
    }

    private static GetUsersFromRestResult(restResult: any): User[] {
        return restResult.d.results.map(userResult => <User>{
            Id: userResult.Id,
            LoginName: userResult.LoginName,
            Title: userResult.Title,
            Email: userResult.Email,
        });
    }

    private static FilterSystemUsers(users: User[]): User[] {
        const usersWithTitlesToIgnore = ["Everyone", "Everyone except external users", "NT AUTHORITY\\authenticated users"];

        return users
            .filter(user => user.Id < 1000000000) // users with IDs over that are system users
            .filter(user => usersWithTitlesToIgnore.indexOf(user.Title) === -1) // there are a few exceptions we need to ignore
            .filter(user => !user.Title.startsWith("_spocrawler_")) // also ignore any users which titles start with "_spocrawler_" - this is some kind of SharePoint Online crawler account
            ;
    }
}