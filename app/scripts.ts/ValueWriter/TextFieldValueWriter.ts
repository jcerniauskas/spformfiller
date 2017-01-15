import { IValueWriter } from "./IValueWriter";
import { IFieldInfo } from "../FieldInfo/IFieldInfo";
import { injectable } from "inversify";

@injectable()
export default class TextFieldValueWriter implements IValueWriter {
    public WriteValue(fieldInfo: IFieldInfo, value: any): void {
        let inputField = $(`input[id^=${fieldInfo.InternalName}_${fieldInfo.Id.toLowerCase()}]`);
        if (inputField === null || inputField.length === 0) {
            throw new Error("Cannot find field to fill with value");
        }
        if (inputField.length > 1) {
            throw new Error("More than one field found");
        }

        inputField.val(value);
    }
}