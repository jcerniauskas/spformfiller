import { injectable, inject } from "inversify";
import { IUserService, User } from "./IUserService";
import { ISPRestAPI } from "../../SPRestAPI/ISPRestAPI";

interface GroupUserPromises {
    [groupId: number]: Promise<User[]>;
}

// this implementation of IUserService uses SharePoint's REST API to get information about site or group users
@injectable()
export class UserRESTService implements IUserService {
    public constructor( @inject("ISPRestAPI") private _spRestAPI: ISPRestAPI) {
    }

    // we will cache site users promise for improved performance when making multiple requests
    private _siteUsers: Promise<User[]>;
    public async GetSiteUsers(): Promise<User[]> {
        if (this._siteUsers === undefined) {
            this._siteUsers = this._spRestAPI.GetSiteUsers().then(restResult => UserRESTService.GetUsersFromRestResult(restResult));
        }

        const users = await this._siteUsers;
        return UserRESTService.FilterSystemUsers(users);
    }

    // we will use a dictionary to cache promises for each requested group for improved performance when making multiple requests
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
        return users
            .filter(user => user.Id < 1000000000) // users with IDs over that are system users
            .filter(user => !user.LoginName.startsWith("c:0")) // there are a few exceptions we need to ignore - some of the "special" accounts start with "c:0"
            .filter(user => user.Title.indexOf("_spocrawler_") === -1) // also ignore any users which titles contain "_spocrawler_" - this is some kind of SharePoint Online crawler account
            ;
    }
}