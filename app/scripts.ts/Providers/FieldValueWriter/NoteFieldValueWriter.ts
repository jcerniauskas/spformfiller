import { IFieldValueWriter } from "./IFieldValueWriter";
import { IFieldInfo } from "../../FieldInfo/IFieldInfo";
import { injectable } from "inversify";
import { FieldValueWriterBase } from "./FieldValueWriterBase";

// this class writes a value to a text field (which should be a textarea field)
@injectable()
export default class NoteFieldValueWriter extends FieldValueWriterBase {
    public WriteValue(fieldInfo: IFieldInfo, value: any): void {
        const textAreaField = super.GetInputControlForField(fieldInfo, "textarea", "$TextField");

        textAreaField.val(value);
    }
}