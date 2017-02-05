import TestContainer from "../../test/inversify.config";
import { IFieldValueProvider } from "./IFieldValueProvider";
import { IFieldInfo, ITextFieldInfo, IFieldInfoGatherer, IManagedMetadataFieldInfo } from "./../../FieldInfo/IFieldInfo";
import ManagedMetadataFieldRandomValueProvider from "./ManagedMetadataFieldRandomValueProvider";
import { IManagedMetadataService, Term } from "../../Services/IManagedMetadataService";
import MockManagedMetadataService from "../../Services/test/MockManagedMetadataService";

describe("ManagedMetadataFieldRandomValueProvider", () => {
    TestContainer.snapshot();

    const mockManagedMetadataService = TestContainer.bindAndGetSpecificInstance<IManagedMetadataService>("IManagedMetadataService", MockManagedMetadataService);
    const managedMetadataFieldValueProvider = TestContainer.bindAndGetSpecificInstance<IFieldValueProvider>("IFieldValueProvider", ManagedMetadataFieldRandomValueProvider);

    it("should return one of the mock terms", async (done) => {
        const managedMetadataFieldInfo = <IManagedMetadataFieldInfo> {
            InternalName: "ManagedMetadataTest",
            TermSetId: "048ade07-4c58-4f4d-b65d-94e73be8f344"
        }
        const allowedValues = ["Term 1", "Term 2", "Term 3"];
        for (let i = 0; i < 10; i++) {
            const randomValue = <Term> await managedMetadataFieldValueProvider.GetRandomValue(managedMetadataFieldInfo);
            const randomValueIsAllowed = allowedValues.some(v => v === randomValue.Name);
            expect(randomValueIsAllowed).toBe(true);
        }
        done();
    });

    afterAll(() => {
        TestContainer.restore();
    });
});