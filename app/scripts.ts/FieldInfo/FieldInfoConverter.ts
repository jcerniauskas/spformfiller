import { IFieldInfo, ITextFieldInfo, IDateFieldInfo, IChoiceFieldInfo, DateFormat } from "./IFieldInfo";

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

        if (baseFieldInfo.Type === "Choice") {
            let choiceFieldInfo = <IChoiceFieldInfo> baseFieldInfo;
            choiceFieldInfo.Choices = fieldInfoResultFromRestAPI.Choices;
            return choiceFieldInfo;
        }

        return baseFieldInfo;
    }
}