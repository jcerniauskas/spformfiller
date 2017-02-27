import { RandomDateProvider } from "./RandomDateProvider";
import { Random } from "../../Utils/Random";

describe("RandomDateProvider", () => {
    const randomValues = new Array<Date>(100).fill(new Date(1970, 0, 1));

    beforeAll(async (done) => {
        // try running this for 100 times to try out more random values
        for (let i in randomValues) {
            randomValues[i] = <Date>await RandomDateProvider.GetRandomDatePlusMinusOneYear();
        }
        done();
    });

    const currentDateYearBefore = new Date();
    currentDateYearBefore.setFullYear(new Date().getFullYear() - 1);
    const currentDateYearAfter = new Date();
    currentDateYearAfter.setFullYear(new Date().getFullYear() + 1);

    it("should return date between current date minus one year and current date plus one year", () => {
        for (let randomDate of randomValues) {
            expect(randomDate.getTime()).toBeGreaterThanOrEqual(currentDateYearBefore.getTime());
            expect(randomDate.getTime()).toBeLessThanOrEqual(currentDateYearAfter.getTime());
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