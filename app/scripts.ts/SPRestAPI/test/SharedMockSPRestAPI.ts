import { SiteUsers } from "./Shared/SiteUsers";
import { Group6Users } from "./Shared/Group6Users";
import { ISPRestAPI } from "../ISPRestAPI";
import TestUtils from "../../test/TestUtils";

export abstract class SharedMockSPRestAPI implements ISPRestAPI {
    public abstract GetList(): Promise<any>;

    public abstract GetListFields(): Promise<any>;

    public abstract GetListContentTypeFields(): Promise<any>;

    public GetSiteUsers(): Promise<any> {
        return TestUtils.ReturnDelay(SiteUsers);
    }

    public GetGroupUsers(groupId: number): Promise<any> {
        return TestUtils.ReturnDelay(Group6Users);
    }
}