import { IFieldInfo, IPeopleFieldInfo } from "./../../FieldInfo/IFieldInfo";
import { IFieldValueProvider } from "./IFieldValueProvider";
import { injectable, inject } from "inversify";
import { IUserService, User } from "../../Services/IUserService";
import Random from "../../Utils/Random";

// this class returns a random sentence of 3 to 5 words for filling in small text fields
@injectable()
export default class PeopleFieldRandomValueProvider implements IFieldValueProvider {
    constructor(@inject("IUserService") private _userService: IUserService) { }

    public async GetRandomValue(fieldInfo: IPeopleFieldInfo): Promise<any> {
        let users: User[];
        if (fieldInfo.GroupId) {
            users = await this._userService.GetGroupUsers(fieldInfo.GroupId);
        } else {
            users = await this._userService.GetSiteUsers();
        }

        return Random.RandomChoice(users);
    }
}