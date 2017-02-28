import { injectable } from "inversify";
import { IDateFormatService } from "./IDateFormatService";

@injectable()
export class MockDateFormatService implements IDateFormatService {
    public GetFormattedDate(date: Date): Promise<string> {
        const formattedValue = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
        return Promise.resolve<string>(formattedValue);
    }
}