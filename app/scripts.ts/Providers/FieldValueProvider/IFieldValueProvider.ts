import { IFieldInfo } from "../../FieldInfo/IFieldInfo";

export interface IFieldValueProvider {
    GetRandomValue(fieldInfo: IFieldInfo): Promise<any>;
}