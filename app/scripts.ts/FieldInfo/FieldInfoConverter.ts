import { IFieldInfo, ITextFieldInfo, IDateFieldInfo, IChoiceFieldInfo, DateFormat, ChoiceFormat } from "./IFieldInfo";

export default class FieldInfoConverter {
    public static ConvertToIFieldInfo(fieldInfoResultFromRestAPI: any): IFieldInfo {
        let baseFieldInfo = <IFieldInfo> {
                        InternalName: fieldInfoResultFromRestAPI.InternalName,
                        Title: fieldInfoResultFromRestAPI.Title,
                        Id: fieldInfoResultFromRestAPI.Id,
                        Hidden: fieldInfoResultFromRestAPI.Hidden,
                        Type: fieldInfoResultFromRestAPI.TypeAsString,
                        ReadOnlyField: fieldInfoResultFromRestAPI.ReadOnlyField,
                    };

        if (baseFieldInfo.Type === "Text") {
            let textFieldInfo = <ITextFieldInfo> baseFieldInfo;
            textFieldInfo.MaxLength = fieldInfoResultFromRestAPI.MaxLength;
            return textFieldInfo;
        }

        if (baseFieldInfo.Type === "DateTime") {
            let dateFieldInfo = <IDateFieldInfo> baseFieldInfo;
            dateFieldInfo.DateFormat = fieldInfoResultFromRestAPI.DisplayFormat === 0 ? DateFormat.DateOnly : DateFormat.DateAndTime;
            return dateFieldInfo;
        }

        if (baseFieldInfo.Type === "Choice" || baseFieldInfo.Type === "MultiChoice") {
            let choiceFieldInfo = <IChoiceFieldInfo> baseFieldInfo;
            choiceFieldInfo.FillInChoice = fieldInfoResultFromRestAPI.FillInChoice;
            choiceFieldInfo.Choices = fieldInfoResultFromRestAPI.Choices;
            if (baseFieldInfo.Type === "MultiChoice") {
                choiceFieldInfo.ChoiceFormat = ChoiceFormat.CheckBoxes;
            } else {
                choiceFieldInfo.ChoiceFormat = fieldInfoResultFromRestAPI.EditFormat === 1 ? ChoiceFormat.Radio : ChoiceFormat.DropDown;
            }
            return choiceFieldInfo;
        }

        return baseFieldInfo;
    }
}