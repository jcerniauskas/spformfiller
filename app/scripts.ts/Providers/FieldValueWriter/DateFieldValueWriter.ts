import { IFieldValueWriter } from "./IFieldValueWriter";
import { IFieldInfo } from "../../FieldInfo/IFieldInfo";
import { injectable } from "inversify";

// this class writes a value to a date field
@injectable()
export default class DateFieldValueWriter implements IFieldValueWriter {
    public WriteValue(fieldInfo: IFieldInfo, value: any): void {
        const dateInputField = $(`input[id='${fieldInfo.InternalName}_${fieldInfo.Id.toLowerCase()}_$DateTimeFieldDate']`);
        if (dateInputField === null || dateInputField.length === 0) {
            throw new Error("Cannot find field to fill with value");
        }
        if (dateInputField.length > 1) {
            throw new Error("More than one field found");
        }

        const dateValue = <Date>value;
        // TODO: test for regional settings effect
        const formattedValue = `${dateValue.getMonth() + 1}/${dateValue.getDate()}/${dateValue.getFullYear()}`;
        dateInputField.val(formattedValue);

        // check if this is a Date + Time field
        if (fieldInfo.DisplayFormat === 1) {
            // in this case we must also update the hour and minute values
            const hourSelectField = $(`select[id='${fieldInfo.InternalName}_${fieldInfo.Id.toLowerCase()}_$DateTimeFieldDateHours']`);
            // TODO: test for regional settings effect
            hourSelectField.val(dateValue.getHours());

            const minutesSelectField = $(`select[id='${fieldInfo.InternalName}_${fieldInfo.Id.toLowerCase()}_$DateTimeFieldDateMinutes']`);
            minutesSelectField.val(DateFieldValueWriter.PadZero(dateValue.getMinutes()));
        }
    }

    // Pads a zero in front of a numbers string representation if it's below 10
    private static PadZero(numberToPad: number): string {
        return (numberToPad < 10) ? ("0" + numberToPad) : numberToPad.toString();
    }
}