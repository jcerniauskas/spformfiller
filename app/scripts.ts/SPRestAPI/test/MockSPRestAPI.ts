import { ISPRestAPI } from "../ISPRestAPI";
import { injectable } from "inversify";
import { FieldsMockReturnValue } from "./FieldsMockReturnValue";
import { ListMockReturnValue } from "./ListMockResturnValue";

@injectable()
export default class MockSPRestAPI implements ISPRestAPI {
    private ReturnDelay(variable: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            setTimeout(() => { resolve(variable); }, 500);
        });
    }

    public GetListFields(): Promise<any> {
        return this.ReturnDelay(FieldsMockReturnValue);
    }

    public GetList(): Promise<any> {
        return this.ReturnDelay(ListMockReturnValue);
    }
}