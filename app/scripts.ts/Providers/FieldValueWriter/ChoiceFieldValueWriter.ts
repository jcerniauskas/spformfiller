import { IFieldValueWriter } from "./IFieldValueWriter";
import { IFieldInfo, IChoiceFieldInfo, ChoiceFormat } from "../../FieldInfo/IFieldInfo";
import { injectable } from "inversify";
import { FieldValueWriterBase } from "./FieldValueWriterBase";

// this class writes a value to a choice field
@injectable()
export class ChoiceFieldValueWriter extends FieldValueWriterBase {
    public WriteValue(fieldInfo: IChoiceFieldInfo, value: any): void {
        if (fieldInfo.ChoiceFormat === ChoiceFormat.DropDown) {
            const selectField = super.GetInputControlForField(fieldInfo, "select", "$DropDownChoice");

            // make sure the option value is there:
            const optionValueField = selectField.find(`option[value='${value}']`);
            super.ThrowErrorIfNoElement(optionValueField, `Cannot find an option field with the specified value '${value}'`);

            if (fieldInfo.FillInChoice) {
                const radioButtonField = super.GetInputControlForField(fieldInfo, "input", "DropDownButton");
                radioButtonField.prop("checked", true);
            }

            selectField.val(value);
        }

        if (fieldInfo.ChoiceFormat === ChoiceFormat.Radio) {
            const idSelector = super.GetIdSelectorForInputControl(fieldInfo);
            const allRadioFieldChoices = $(`input[id^='${idSelector}_$RadioButtonChoiceField']`);
            const valueRadioField = allRadioFieldChoices.filter(`[value='${value}']`);
            super.ThrowErrorIfNoElement(valueRadioField, `Cannot find a radio button with the specified value '${value}'`);

            valueRadioField.prop("checked", true);
        }

        if (fieldInfo.ChoiceFormat === ChoiceFormat.CheckBoxes) {
            const fieldTable = super.GetInputControlForField(fieldInfo, "table", "MultiChoiceTable");

            // uncheck all other checkboxes first
            fieldTable.find("input[type='checkbox']").prop("checked", false);

            // then find the one we need to set
            const labelFieldWithValue = fieldTable.find(`label:contains('${value}')`);
            super.ThrowErrorIfNoElement(labelFieldWithValue, `Cannot find a label with the specified value '${value}'`);

            const checkboxNearLabel = labelFieldWithValue.siblings("input[type='checkbox']");
            super.ThrowErrorIfNoElement(checkboxNearLabel, `Cannot find a checkbox near the label with the specified value '${value}'`);

            checkboxNearLabel.prop("checked", true);
        }
    }
}