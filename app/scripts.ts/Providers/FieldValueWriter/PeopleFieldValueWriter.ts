import { IFieldValueWriter } from "./IFieldValueWriter";
import { IFieldInfo } from "../../FieldInfo/IFieldInfo";
import { injectable } from "inversify";
import { FieldValueWriterBase } from "./FieldValueWriterBase";
import { User } from "../../Services/IUserService";

// this class writes a value to a text field (which should be a simple input field)
@injectable()
export default class PeopleFieldValueWriter extends FieldValueWriterBase {
    public WriteValue(fieldInfo: IFieldInfo, value: User): void {
        const peoplePickerDiv = super.GetInputControlForField(fieldInfo, "div", "$ClientPeoplePicker");
        const editorControl = super.GetInputControlForField(fieldInfo, "input", "$ClientPeoplePicker_EditorInput");

        const peoplePickerSPControl = SPClientPeoplePicker.SPClientPeoplePickerDict[peoplePickerDiv[0].id];
        editorControl.val(value.LoginName);
        peoplePickerSPControl.AddUnresolvedUserFromEditor(true);
    }
}