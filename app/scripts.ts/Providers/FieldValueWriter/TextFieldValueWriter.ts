import { IFieldValueWriter } from "./IFieldValueWriter";
import { IFieldInfo } from "../../FieldInfo/IFieldInfo";
import { injectable } from "inversify";
import { FieldValueWriterBase } from "./FieldValueWriterBase";

// this class writes a value to a text field (which should be a simple input field)
@injectable()
export default class TextFieldValueWriter extends FieldValueWriterBase {
    public WriteValue(fieldInfo: IFieldInfo, value: any): void {
        const inputField = super.GetInputControlForField(fieldInfo, "input", "$TextField");

        inputField.val(value);
    }
}