import { ISPRestAPI } from "../../ISPRestAPI";
import { injectable } from "inversify";
import { ListFields } from "./ListFields";
import { List } from "./List";
import { ContentTypeFields } from "./ContentTypeFields";
import { TestUtils } from "../../../test/TestUtils";
import { SharedMockSPRestAPI } from "../SharedMockSPRestAPI";

// this is a base mock implementation of ISPRestAPI service that uses pre-recorded SharePoint REST API responses where content types have been enabled for the list
@injectable()
export class MockSPRestAPI extends SharedMockSPRestAPI {
    public GetList(): Promise<any> {
        return TestUtils.ReturnDelay(List);
    }

    public GetListFields(): Promise<any> {
        return TestUtils.ReturnDelay(ListFields);
    }

    public GetListContentTypeFields(): Promise<any> {
        return TestUtils.ReturnDelay(ContentTypeFields);
    }
}