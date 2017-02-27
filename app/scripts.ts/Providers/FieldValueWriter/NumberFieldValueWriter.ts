import { IFieldValueWriter } from "./IFieldValueWriter";
import { IFieldInfo, INumberFieldInfo } from "../../FieldInfo/IFieldInfo";
import { injectable } from "inversify";
import { FieldValueWriterBase } from "./FieldValueWriterBase";

// this class writes a value to a number field (which should be a simple input field)
@injectable()
export class NumberFieldValueWriter extends FieldValueWriterBase {
    public WriteValue(fieldInfo: INumberFieldInfo, value: any): void {
        let fieldSuffix = "$NumberField";
        // there is a slight difference in Currency type of fields - their control IDs are slightly different
        if (fieldInfo.SharePointTypeAsString === "Currency") {
            fieldSuffix = "$CurrencyField";
        }

        const inputField = super.GetInputControlForField(fieldInfo, "input", fieldSuffix);

        inputField.val(value);
    }
}