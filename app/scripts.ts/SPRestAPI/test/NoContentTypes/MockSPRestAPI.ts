import { ISPRestAPI } from "../../ISPRestAPI";
import { injectable } from "inversify";
import { ListFields } from "./ListFields";
import { List } from "./List";
import TestUtils from "../../../test/TestUtils";
import { SharedMockSPRestAPI } from "../SharedMockSPRestAPI";

@injectable()
export default class MockSPRestAPI extends SharedMockSPRestAPI {
    public GetList(): Promise<any> {
        return TestUtils.ReturnDelay(List);
    }

    public GetListFields(): Promise<any> {
        return TestUtils.ReturnDelay(ListFields);
    }

    public GetListContentTypeFields(): Promise<any> {
        throw new Error("This list does not have content types enabled");
    }
}