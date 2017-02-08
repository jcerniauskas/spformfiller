export interface Term {
    Id: string;
    Name: string;
}

export interface IManagedMetadataService {
    GetTermsAvailableForTagging(termsetId: string): Promise<Term[]>;
}