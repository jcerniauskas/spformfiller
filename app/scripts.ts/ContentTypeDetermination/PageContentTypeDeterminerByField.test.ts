import TestContainer from "../test/inversify.config";
import { IContentTypeDeterminer, IContentTypeInformation } from "./IContentTypeInfo";
import { PageContentTypeDeterminerByField } from "./PageContentTypeDeterminerByField";

describe("PageContentTypeDeterminerByField", () => {
    TestContainer.snapshot();

    const contentTypeDeterminerByField = TestContainer.bindAndGetSpecificInstance<IContentTypeDeterminer>(
        "IContentTypeDeterminer", PageContentTypeDeterminerByField);

    it("Should show 'Caruna Document' content type", async (done) => {
        loadFixtures("ContentTypeDetermination/test/fixtures/CarunaDocumentFixture.html");
        let contentTypeInformation = await contentTypeDeterminerByField.GetContentTypeInformation();
        expect(contentTypeInformation.ContentTypeId).toBe("0x010100F919E94B778746758419E38E98A0550D00DE223D4D04A75F4B96371C07EFB48057");
        done();
    });

    afterAll(() => {
        TestContainer.restore();
    });
});