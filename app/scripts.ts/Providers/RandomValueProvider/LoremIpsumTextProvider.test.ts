import LoremIpsumTextProvider from "./LoremIpsumTextProvider";
import Random from "../../Utils/Random";

describe("LoremIpsumTextProvider", () => {
   const fromWords = 3;
   const toWords = 5;
   const randomValues = new Array<string>(100).fill("");

   beforeAll(async (done) => {
       // try running this for 100 times to try out more random values
       for (let i in randomValues) {
        randomValues[i] = <string> await LoremIpsumTextProvider.GetRandomSentence(fromWords, toWords);
       }
       done();
   });

   it("should return 3 to 5 words", () => {
       for (let randomSentence of randomValues) {
        expect(randomSentence.split(" ").length).toBeGreaterThanOrEqual(fromWords);
        expect(randomSentence.split(" ").length).toBeLessThanOrEqual(toWords);
       }
   });

   it("should return random values", () => {
        const randomSingleValue = randomValues[Random.RandomIntFromInterval(0, randomValues.length)];
        const sameValuesInArray = randomValues.filter(val => val == randomSingleValue);
        const countOfSameValuesInArray = sameValuesInArray.length;
        // expect that there are no more than 10% of the same values from the generate array
        expect(countOfSameValuesInArray).toBeLessThanOrEqual(randomValues.length * 0.1);
    });
});