import { Random } from "../../Utils/Random";

// this class returns a random date based on various constraints
export class RandomDateProvider {
    public static GetRandomDatePlusMinusOneYear(): Promise<any> {
        const currentDateYearBefore = new Date();
        currentDateYearBefore.setFullYear(new Date().getFullYear() - 1);
        const currentDateYearAfter = new Date();
        currentDateYearAfter.setFullYear(new Date().getFullYear() + 1);
        const currentDatePlusMinusOneYear = Random.RandomDate(currentDateYearBefore, currentDateYearAfter);
        return Promise.resolve(currentDatePlusMinusOneYear);
    }
}