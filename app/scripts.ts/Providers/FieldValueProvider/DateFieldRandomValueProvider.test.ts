import TestContainer from "../../test/inversify.config";
import { IFieldValueProvider } from "./IFieldValueProvider";
import { IFieldInfo, IDateFieldInfo, DateFormat } from "./../../FieldInfo/IFieldInfo";
import { DateFieldRandomValueProvider } from "./DateFieldRandomValueProvider";
import { IDateValue } from "../ValueTypes/IDateValue";

describe("DateFieldRandomValueProvider", () => {
    TestContainer.snapshot();

    const randomValues = new Array<IDateValue>(100).fill(<IDateValue>{ Date: new Date(1970, 0, 1), FormattedDate: "1/1/1970" });

    const dateFieldValueProvider = TestContainer.bindAndGetSpecificInstance<IFieldValueProvider>("IFieldValueProvider", DateFieldRandomValueProvider);

    beforeAll(async (done) => {
        const dateFieldInfo = <IDateFieldInfo> {
                        InternalName: "SPF_x0020_Date_x0020_time",
                        Title: "SPF Date time",
                        Id: "dfa5fdf4-a2ac-48db-8b0b-987dfedc4ade",
                        Hidden: false,
                        DateFormat: DateFormat.DateAndTime,
                    };
        // try running this for 100 times to try out more random values
        for (let i in randomValues) {
            randomValues[i] = <IDateValue>await dateFieldValueProvider.GetRandomValue(dateFieldInfo);
        }
        done();
    });

    it("should round the time to 5 minutes", () => {
        for (let randomDate of randomValues) {
            expect(randomDate.Date.getMinutes() % 5).toEqual(0); 
        }
    });

    afterAll(() => {
        TestContainer.restore();
    });
});