import { injectable } from "inversify";
import { IFieldValueProvider } from "../../../Providers/FieldValueProvider/IFieldValueProvider";
import { Term, IManagedMetadataService } from "../IManagedMetadataService";
import TestUtils from "../../../test/TestUtils";

@injectable()
export default class MockManagedMetadataService implements IManagedMetadataService {
    public GetTermsAvailableForTagging(termsetId: string): Promise<Term[]> {
        return Promise.resolve(<Term[]>[{
                Id: "123",
                Name: "Term 1",
            },
            {
                Id: "124",
                Name: "Term 2",
            },
            {
                Id: "125",
                Name: "Term 3",
            },
        ]);
    }
}