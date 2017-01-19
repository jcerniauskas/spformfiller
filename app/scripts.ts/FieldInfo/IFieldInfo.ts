export interface IFieldInfo {
    InternalName: string;
    Title: string;
    Id: string;
    Hidden: boolean;
    Type: string;
}

export interface IFieldInfoGatherer {
    GetFieldInfo(): Promise<IFieldInfo[]>;
    GetVisibleEditableFieldInfo(): Promise<IFieldInfo[]>;
}