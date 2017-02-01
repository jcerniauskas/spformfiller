import { ISPRestAPI } from "../../ISPRestAPI";
import { injectable } from "inversify";
import { ListFields } from "./ListFields";
import { List } from "./List";
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
        throw new Error("This list does not have content types enabled");
    }
}