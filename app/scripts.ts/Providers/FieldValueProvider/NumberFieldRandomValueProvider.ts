import { IFieldInfo, INumberFieldInfo } from "./../../FieldInfo/IFieldInfo";
import { IFieldValueProvider } from "./IFieldValueProvider";
import { injectable } from "inversify";
import Random from "../../Utils/Random";

// this class returns a random number adhering to the field's constraints
@injectable()
export default class NumberFieldRandomValueProvider implements IFieldValueProvider {
    public async GetRandomValue(fieldInfo: INumberFieldInfo): Promise<any> {
        let minValueToRandom = fieldInfo.MinValue;
        let maxValueToRandom = fieldInfo.MaxValue;

        // for fields which don't have a specific MinValue and MaxValue the random interval can get very crazy, so we will try to narrow the random interval

        // first we'll check if we can use 1 as a minimum value
        if (minValueToRandom < 1 && maxValueToRandom > 1) {
            minValueToRandom = 1;
        }
        // now let's limit the maximum value to up to ~10000 greater than minimal value - this is usually fully sufficient for filling in random data
        if (maxValueToRandom - minValueToRandom > 9998) {
            maxValueToRandom = minValueToRandom + 9998;
        }

        return Promise.resolve(Random.RandomIntFromInterval(minValueToRandom, maxValueToRandom));
    }
}