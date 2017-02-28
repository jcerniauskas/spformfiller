export interface IDateFormatService {
    GetFormattedDate(date: Date): Promise<string>;
}