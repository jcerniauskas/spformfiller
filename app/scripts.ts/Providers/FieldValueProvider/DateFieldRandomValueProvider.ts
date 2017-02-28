import { IFieldInfo } from "./../../FieldInfo/IFieldInfo";
import { IFieldValueProvider } from "./IFieldValueProvider";
import { injectable, inject } from "inversify";
import { RandomDateProvider } from "../RandomValueProvider/RandomDateProvider";
import { IDateFormatService } from "../../Services/DateFormat/IDateFormatService";
import { IDateValue } from "../ValueTypes/IDateValue";

// this class returns a random date rounded to 5 minutes (you can only select time in 5 minute increments in SharePoint)
@injectable()
export class DateFieldRandomValueProvider implements IFieldValueProvider {
    constructor(@inject("IDateFormatService") private _dateFormatService: IDateFormatService) { }

    public async GetRandomValue(fieldInfo: IFieldInfo): Promise<any> {
        let randomDate: Date = await RandomDateProvider.GetRandomDatePlusMinusOneYear();
        randomDate = DateFieldRandomValueProvider.RoundTo15Minutes(randomDate);
        const formattedDate = await this._dateFormatService.GetFormattedDate(randomDate);

        return Promise.resolve(<IDateValue>{
            Date: randomDate,
            FormattedDate: formattedDate
        });
    }

    // SharePoint requires time to be rounded to 5 minute intervals
    private static RoundTo15Minutes(date: Date): Date {
        const coeff = 1000 * 60 * 5;
        return new Date(Math.round(date.getTime() / coeff) * coeff);
    }
}