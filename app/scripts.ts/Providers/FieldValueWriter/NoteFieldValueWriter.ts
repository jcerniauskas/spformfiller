import { IFieldValueWriter } from "./IFieldValueWriter";
import { IFieldInfo } from "../../FieldInfo/IFieldInfo";
import { injectable } from "inversify";
import { FieldValueWriterBase } from "./FieldValueWriterBase";

// this class writes a value to a text field (which should be a textarea field)
@injectable()
export default class NoteFieldValueWriter extends FieldValueWriterBase {
    public WriteValue(fieldInfo: IFieldInfo, value: any): void {
        let textAreaField = super.TryGetInputControlForField(fieldInfo, "textarea", "$TextField");
        if (!textAreaField) {
            textAreaField = super.TryGetInputControlForField(fieldInfo, "textarea", "$TextField_inplacerte");
        }
        super.ThrowErrorIfNoElement(textAreaField);
        super.ThrowErrorIfMultiple(textAreaField);

        textAreaField.val(value);
    }
}