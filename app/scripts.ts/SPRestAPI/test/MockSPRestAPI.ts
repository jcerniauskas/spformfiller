import { ISPRestAPI } from "../ISPRestAPI";
import { injectable } from "inversify";
import { FieldsMockReturnValue } from "./FieldsMockReturnValue";
import { ListMockReturnValue } from "./ListMockResturnValue";
import { ContentTypeFieldsMockReturnValue } from "./ContentTypeFieldsMockReturnValue";

@injectable()
export default class MockSPRestAPI implements ISPRestAPI {
    private ReturnDelay(variable: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            setTimeout(() => { resolve(variable); }, 500);
        });
    }

    public GetList(): Promise<any> {
        return this.ReturnDelay(ListMockReturnValue);
    }

    public GetListFields(): Promise<any> {
        return this.ReturnDelay(FieldsMockReturnValue);
    }

    public GetListContentTypeFields(): Promise<any> {
        return this.ReturnDelay(ContentTypeFieldsMockReturnValue);
    }
}