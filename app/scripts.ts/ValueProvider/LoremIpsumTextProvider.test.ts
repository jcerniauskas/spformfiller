import TestContainer from "../test/inversify.config";
import { IValueProvider } from "./IValueProvider";
import LoremIpsumTextProvider from "./LoremIpsumTextProvider";

describe("LoremIpsumTextProvider", () => {
   TestContainer.snapshot();

   let loremIpsumTextProvider = TestContainer.bindAndGetSpecificInstance<IValueProvider>("LoremIpsumProviderTest", LoremIpsumTextProvider);
   let randomValues = new Array<string>(100).fill("");

   beforeAll(async (done) => {
       // try running this for 100 times to try out more random values
       for (let i in randomValues) {
        randomValues[i] = <string> await loremIpsumTextProvider.GetRandomValue();
       }
       done();
   });

   it("should return 3 to 5 words", () => {
       for (let randomSentence of randomValues) {
        expect(randomSentence.split(" ").length).toBeGreaterThanOrEqual(3);
        expect(randomSentence.split(" ").length).toBeLessThanOrEqual(5);
       }
   });

   afterAll(() => {
       TestContainer.restore();
   });
});