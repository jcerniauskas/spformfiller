import { IFieldValueWriter } from "./IFieldValueWriter";
import { IFieldInfo } from "../../FieldInfo/IFieldInfo";
import { injectable } from "inversify";

// this class writes a value to a text field (which should be a simple input field)
@injectable()
export default class TextFieldValueWriter implements IFieldValueWriter {
    public WriteValue(fieldInfo: IFieldInfo, value: any): void {
        const inputField = $(`input[id='${fieldInfo.InternalName}_${fieldInfo.Id.toLowerCase()}_$TextField']`);
        if (inputField === null || inputField.length === 0) {
            throw new Error("Cannot find field to fill with value");
        }
        if (inputField.length > 1) {
            throw new Error("More than one field found");
        }

        inputField.val(value);
    }
}