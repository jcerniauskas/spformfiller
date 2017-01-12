import TestContainer from "../test/inversify.config";
import { IFieldInfo, IFieldInfoGatherer } from "./IFieldInfo";
import ListFieldInfoRestQuery from "./ListFieldInfoRestQuery";

describe("ListFieldInfoRestQuery", async () => {
    TestContainer.snapshot();

    let listFieldInfoRestQuery = TestContainer.bindAndGetSpecificInstance<IFieldInfoGatherer>("IFieldInfoGatherer", ListFieldInfoRestQuery);
    let visibleFields: IFieldInfo[];
    beforeAll(async (done) => {
        // load fixture for ContentTypeDeterminer to find some content type value
        let fixture = loadFixtures("ContentTypeDetermination/test/fixtures/CarunaDocumentFixture.html");

        visibleFields = await listFieldInfoRestQuery.GetVisibleFieldInfo();
        done();
    });
    
    it("should return 3 visible fields", async (done) => {
        expect(visibleFields.length).toBe(3);
        done();
    })

    afterAll(() => { TestContainer.restore(); });
})