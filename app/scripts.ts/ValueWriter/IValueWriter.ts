import { IFieldInfo } from "../FieldInfo/IFieldInfo";

export interface IValueWriter {
    WriteValue(fieldInfo: IFieldInfo, value: any): void;
}