import { IFieldInfo, ITextFieldInfo, IDateFieldInfo, IChoiceFieldInfo, INumberFieldInfo, IManagedMetadataFieldInfo, IPeopleFieldInfo, DateFormat, ChoiceFormat } from "../../FieldInfo/IFieldInfo";

// this is a factory class for creating IFieldInfo objects from REST service response JSON
export class FieldInfoConverter {
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
            choiceFieldInfo.Choices = fieldInfoResultFromRestAPI.Choices.results;
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

        if (fieldInfoResultFromRestAPI.TypeAsString === "TaxonomyFieldType" || fieldInfoResultFromRestAPI.TypeAsString === "TaxonomyFieldTypeMulti") {
            const managedMetadataFieldInfo = <IManagedMetadataFieldInfo> baseFieldInfo;
            managedMetadataFieldInfo.Type = "TaxonomyFieldType";
            managedMetadataFieldInfo.SspId = fieldInfoResultFromRestAPI.SspId;
            managedMetadataFieldInfo.TermSetId = fieldInfoResultFromRestAPI.TermSetId;
            return managedMetadataFieldInfo;
        }

        if (fieldInfoResultFromRestAPI.TypeAsString === "User" || fieldInfoResultFromRestAPI.TypeAsString === "UserMulti") {
            const peopleFieldInfo = <IPeopleFieldInfo> baseFieldInfo;
            peopleFieldInfo.Type = "User";
            if (fieldInfoResultFromRestAPI.SelectionGroup > 0) {
                peopleFieldInfo.GroupId = fieldInfoResultFromRestAPI.SelectionGroup;
            }
            return peopleFieldInfo;
        }

        return baseFieldInfo;
    }
}