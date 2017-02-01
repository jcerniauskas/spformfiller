import { ISPRestAPI } from "../../ISPRestAPI";
import { injectable } from "inversify";
import { ListFields } from "./ListFields";
import { List } from "./List";
import { ContentTypeFields } from "./ContentTypeFields";
import TestUtils from "../../../test/TestUtils";

@injectable()
export default class MockSPRestAPI implements ISPRestAPI {
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