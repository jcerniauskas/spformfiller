import { IFieldValueWriter } from "./IFieldValueWriter";
import { IFieldInfo } from "../../FieldInfo/IFieldInfo";
import { injectable } from "inversify";
import { FieldValueWriterBase } from "./FieldValueWriterBase";

// this class writes a value to a text field (which should be a textarea field)
@injectable()
export default class NoteFieldValueWriter extends FieldValueWriterBase {
    public WriteValue(fieldInfo: IFieldInfo, value: any): void {
        let textAreaField = super.TryGetInputControlForField(fieldInfo, "textarea", "$TextField");
        if (textAreaField) {
            textAreaField.val(value);
        } else {
            const divField = super.TryGetInputControlForField(fieldInfo, "div", "$TextField_inplacerte");
            super.ThrowErrorIfNoElement(divField);
            super.ThrowErrorIfMultiple(divField);

            const divTextField = divField.children("p");
            super.ThrowErrorIfNoElement(divTextField);
            super.ThrowErrorIfMultiple(divTextField);

            divTextField.text(value);
        }
    }
}