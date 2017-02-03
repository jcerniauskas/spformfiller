export interface IFieldInfo {
    InternalName: string;
    Title: string;
    Id: string;
    Hidden: boolean;
    Type: string;
    ReadOnlyField: boolean;
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

export interface IChoiceFieldInfo extends IFieldInfo {
    Choices: string[];
}