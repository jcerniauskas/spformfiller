import { ISPRestAPI } from "../../ISPRestAPI";
import { injectable } from "inversify";
import { ListFields } from "./ListFields";
import { List } from "./List";

@injectable()
export default class MockSPRestAPI implements ISPRestAPI {
    private ReturnDelay(variable: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            setTimeout(() => { resolve(variable); }, 500);
        });
    }

    public GetList(): Promise<any> {
        return this.ReturnDelay(List);
    }

    public GetListFields(): Promise<any> {
        return this.ReturnDelay(ListFields);
    }

    public GetListContentTypeFields(): Promise<any> {
        throw new Error("This list does not have content types enabled");
    }
}