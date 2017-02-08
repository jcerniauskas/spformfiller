import { injectable } from "inversify";
import { SiteUsers } from "./Shared/SiteUsers";
import { Group6Users } from "./Shared/Group6Users";
import { ISPRestAPI } from "../ISPRestAPI";
import { ContentTypeOrder } from "./Shared/ContentTypeOrder";
import { UniqueContentTypeOrder } from "./Shared/UniqueContentTypeOrder";
import TestUtils from "../../test/TestUtils";

@injectable()
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

    public GetFolderContentTypeOrder(folderServerRelativeUrl: string): Promise<any> {
        return TestUtils.ReturnDelay(ContentTypeOrder);
    }

    public GetFolderUniqueContentTypeOrder(folderServerRelativeUrl: string): Promise<any> {
        return TestUtils.ReturnDelay(UniqueContentTypeOrder);
    }
}