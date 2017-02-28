import { injectable } from "inversify";
import { IDateFormatService } from "./IDateFormatService";

@injectable()
export class DateFormatServiceCSOM implements IDateFormatService {
    public GetFormattedDate(date: Date): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            DateFormatServiceCSOM.ExecuteInContext((context) => {
                const currentWeb = context.get_web();
                const newDate = SP.Utilities.Utility.formatDateTime(context, currentWeb, date, SP.Utilities.DateTimeFormat.dateOnly);
            
                context.executeQueryAsync((sender, data) => {
                    resolve(newDate.get_value());
                }, (sender, args) => {
                    reject(args);
                });
            });
        });
    }

    // this function ensures that CSOM methods will be executed after required SP scripts have been loaded
    private static ExecuteInContext(contextAction: (context: SP.ClientContext) => void): void {
        SP.SOD.loadMultiple(["sp.js"], () => {
            const ctx = SP.ClientContext.get_current();

            contextAction(ctx);
        });
    }
}