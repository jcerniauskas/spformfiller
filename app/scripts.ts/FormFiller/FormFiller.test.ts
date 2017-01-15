import TestContainer from "../test/inversify.config";
import { IFormFiller } from "./IFormFiller";
import FormFiller from "./FormFiller";


describe("FormFiller", () => {
    let formFiller = TestContainer.bindAndGetSpecificInstance<IFormFiller>("IFormFiller", FormFiller);

    it("should fill Title with random text", async (done) => {

        done();
    })
});