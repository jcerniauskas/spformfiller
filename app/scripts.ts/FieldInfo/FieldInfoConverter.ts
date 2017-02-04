import { IFieldInfo, ITextFieldInfo, IDateFieldInfo, IChoiceFieldInfo, INumberFieldInfo, DateFormat, ChoiceFormat } from "./IFieldInfo";

export default class FieldInfoConverter {
    public static ConvertToIFieldInfo(fieldInfoResultFromRestAPI: any): IFieldInfo {
        const baseFieldInfo = <IFieldInfo> {
                        InternalName: fieldInfoResultFromRestAPI.InternalName,
                        Title: fieldInfoResultFromRestAPI.Title,
                        Id: fieldInfoResultFromRestAPI.Id,
                        Hidden: fieldInfoResultFromRestAPI.Hidden,
                        Type: fieldInfoResultFromRestAPI.TypeAsString,
                        ReadOnlyField: fieldInfoResultFromRestAPI.ReadOnlyField,
                        SharePointTypeAsString: fieldInfoResultFromRestAPI.TypeAsString,
                    };

        if (fieldInfoResultFromRestAPI.TypeAsString === "Text") {
            const textFieldInfo = <ITextFieldInfo> baseFieldInfo;
            textFieldInfo.MaxLength = fieldInfoResultFromRestAPI.MaxLength;
            return textFieldInfo;
        }

        if (fieldInfoResultFromRestAPI.TypeAsString === "DateTime") {
            const dateFieldInfo = <IDateFieldInfo> baseFieldInfo;
            dateFieldInfo.DateFormat = fieldInfoResultFromRestAPI.DisplayFormat === 0 ? DateFormat.DateOnly : DateFormat.DateAndTime;
            return dateFieldInfo;
        }

        if (fieldInfoResultFromRestAPI.TypeAsString === "Choice" || fieldInfoResultFromRestAPI.TypeAsString === "MultiChoice") {
            const choiceFieldInfo = <IChoiceFieldInfo> baseFieldInfo;
            choiceFieldInfo.Type = "Choice"; // treat MultiChoice same as Choice
            choiceFieldInfo.FillInChoice = fieldInfoResultFromRestAPI.FillInChoice;
            choiceFieldInfo.Choices = fieldInfoResultFromRestAPI.Choices;
            if (fieldInfoResultFromRestAPI.TypeAsString === "MultiChoice") {
                choiceFieldInfo.ChoiceFormat = ChoiceFormat.CheckBoxes;
            } else {
                choiceFieldInfo.ChoiceFormat = fieldInfoResultFromRestAPI.EditFormat === 1 ? ChoiceFormat.Radio : ChoiceFormat.DropDown;
            }
            return choiceFieldInfo;
        }

        if (fieldInfoResultFromRestAPI.TypeAsString === "Number" || fieldInfoResultFromRestAPI.TypeAsString === "Currency") {
            const numberFieldInfo = <INumberFieldInfo> baseFieldInfo;
            numberFieldInfo.Type = "Number"; // treat Currency same as Number
            numberFieldInfo.MinValue = fieldInfoResultFromRestAPI.MinimumValue;
            numberFieldInfo.MaxValue = fieldInfoResultFromRestAPI.MaximumValue;
            return numberFieldInfo;
        }

        return baseFieldInfo;
    }
}