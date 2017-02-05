import { IFieldValueWriter } from "./IFieldValueWriter";
import { IFieldInfo } from "../../FieldInfo/IFieldInfo";
import { injectable } from "inversify";
import { FieldValueWriterBase } from "./FieldValueWriterBase";
import { User } from "../../Services/IUserService";

// this class writes a value to a user field
@injectable()
export default class PeopleFieldValueWriter extends FieldValueWriterBase {
    public WriteValue(fieldInfo: IFieldInfo, value: User): void {
        const peoplePickerDiv = super.GetInputControlForField(fieldInfo, "div", "$ClientPeoplePicker");
        const editorControl = super.GetInputControlForField(fieldInfo, "input", "$ClientPeoplePicker_EditorInput");

        const peoplePickerSPControl = SPClientPeoplePicker.SPClientPeoplePickerDict[peoplePickerDiv[0].id];

        // clear users
        if (peoplePickerSPControl) {
            const resolvedUsers = $(document.getElementById(peoplePickerSPControl.ResolvedListElementId)).find("span[class='sp-peoplepicker-userSpan']");
            $(resolvedUsers).each(function (index) {
                peoplePickerSPControl.DeleteProcessedUser(this);
            });
        }

        // fill the value
        editorControl.val(value.LoginName);
        peoplePickerSPControl.AddUnresolvedUserFromEditor(true);
    }
}