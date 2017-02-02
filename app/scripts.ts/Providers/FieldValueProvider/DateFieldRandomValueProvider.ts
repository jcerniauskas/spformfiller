import { IFieldInfo } from "./../../FieldInfo/IFieldInfo";
import { IFieldValueProvider } from "./IFieldValueProvider";
import { injectable } from "inversify";
import RandomDateProvider from "../RandomValueProvider/RandomDateProvider";

// this class returns a random sentence of 3 to 5 words for filling in small text fields
@injectable()
export default class DateFieldRandomValueProvider implements IFieldValueProvider {
    public async GetRandomValue(fieldInfo: IFieldInfo): Promise<any> {
        const randomDate: Date = await RandomDateProvider.GetRandomDatePlusMinusOneYear();

        return Promise.resolve(DateFieldRandomValueProvider.RoundTo15Minutes(randomDate));
    }

    // SharePoint requires time to be rounded to 5 minute intervals
    private static RoundTo15Minutes(date: Date): Date {
        const coeff = 1000 * 60 * 5;
        return new Date(Math.round(date.getTime() / coeff) * coeff);
    }
}