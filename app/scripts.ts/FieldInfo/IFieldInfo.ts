export interface IFieldInfo {
    InternalName: string;
    Title: string;
    Id: string;
    Hidden: boolean;
    Type: string;
    ReadOnlyField: boolean;
    SharePointTypeAsString: string;
}

export interface IFieldInfoGatherer {
    GetFieldInfo(): Promise<IFieldInfo[]>;
    GetVisibleEditableFieldInfo(): Promise<IFieldInfo[]>;
}

export interface ITextFieldInfo extends IFieldInfo {
    MaxLength: number;
}

export enum DateFormat {
    DateOnly,
    DateAndTime
}
export interface IDateFieldInfo extends IFieldInfo {
    DateFormat: DateFormat;
}

export enum ChoiceFormat {
    DropDown,
    Radio,
    CheckBoxes,
}

export interface IChoiceFieldInfo extends IFieldInfo {
    FillInChoice: boolean;
    ChoiceFormat: ChoiceFormat;
    Choices: string[];
}

export interface INumberFieldInfo extends IFieldInfo {
    MinValue: number;
    MaxValue: number;
}