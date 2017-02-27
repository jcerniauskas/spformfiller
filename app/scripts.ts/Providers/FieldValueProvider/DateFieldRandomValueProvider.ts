import { IFieldInfo } from "./../../FieldInfo/IFieldInfo";
import { IFieldValueProvider } from "./IFieldValueProvider";
import { injectable } from "inversify";
import { RandomDateProvider } from "../RandomValueProvider/RandomDateProvider";

// this class returns a random date rounded to 5 minutes (you can only select time in 5 minute increments in SharePoint)
@injectable()
export class DateFieldRandomValueProvider implements IFieldValueProvider {
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