import { IFieldInfo } from "../FieldInfo/IFieldInfo";

export interface IFieldValueWriter {
    WriteValue(fieldInfo: IFieldInfo, value: any): void;
}