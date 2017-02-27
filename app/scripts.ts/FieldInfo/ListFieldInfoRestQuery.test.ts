import TestContainer from "../test/inversify.config";
import { ISPRestAPI } from "./../SPRestAPI/ISPRestAPI";
import { MockSPRestAPI as MockSPRestAPIContentTypesEnabled } from "../SPRestAPI/test/ContentTypesEnabled/MockSPRestAPI";
import { IFieldInfo, IFieldInfoGatherer } from "./IFieldInfo";
import { ListFieldInfoRestQuery } from "./ListFieldInfoRestQuery";

describe("ListFieldInfoRestQuery", async () => {
    TestContainer.snapshot();

    const contentTypesEnabledRestApi = TestContainer.bindAndGetSpecificInstance<ISPRestAPI>("ISPRestAPI", MockSPRestAPIContentTypesEnabled);
    const listFieldInfoRestQuery = TestContainer.bindAndGetSpecificInstance<IFieldInfoGatherer>("IFieldInfoGatherer", ListFieldInfoRestQuery);
    let visibleFields: IFieldInfo[];
    beforeAll(async (done) => {
        // load fixture for ContentTypeDeterminer to find some content type value
        loadFixtures("ContentTypeDetermination/test/fixtures/CarunaDocumentFixture.html");

        visibleFields = await listFieldInfoRestQuery.GetVisibleEditableFieldInfo();
        done();
    });
    
    // the specific count is only checked in this mode because we explicitly request a 'Content types enabled' mock list, which we know only returns 1 visible field - Title
    describe("when in 'Content types enabled' mode", () => {
        it("should return just 1 visible field", async (done) => {
            expect(visibleFields.length).toBe(1);
            done();
        })
    });

    afterAll(() => { TestContainer.restore(); });
})