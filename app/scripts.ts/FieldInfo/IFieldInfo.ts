export interface IFieldInfo {
    InternalName: string;
    Title: string;
    Id: string;
}

export interface IFieldInfoGatherer {
    GetFieldInfos(): Promise<IFieldInfo[]>;
}