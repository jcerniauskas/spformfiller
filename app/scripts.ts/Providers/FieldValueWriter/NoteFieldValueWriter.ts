import { IFieldValueWriter } from "./IFieldValueWriter";
import { IFieldInfo } from "../../FieldInfo/IFieldInfo";
import { injectable } from "inversify";

// this class writes a value to a text field (which should be a textarea field)
@injectable()
export default class NoteFieldValueWriter implements IFieldValueWriter {
    public WriteValue(fieldInfo: IFieldInfo, value: any): void {
        const textAreaField = $(`textarea[id='${fieldInfo.InternalName}_${fieldInfo.Id.toLowerCase()}_$TextField']`);
        if (textAreaField === null || textAreaField.length === 0) {
            throw new Error("Cannot find field to fill with value");
        }
        if (textAreaField.length > 1) {
            throw new Error("More than one field found");
        }

        textAreaField.val(value);
    }
}