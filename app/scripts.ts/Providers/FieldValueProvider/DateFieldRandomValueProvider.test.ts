import TestContainer from "../../test/inversify.config";
import { IFieldValueProvider } from "./IFieldValueProvider";
import { IFieldInfo, IDateFieldInfo, DateFormat } from "./../../FieldInfo/IFieldInfo";
import DateFieldRandomValueProvider from "./DateFieldRandomValueProvider";

describe("DateFieldRandomValueProvider", () => {
    TestContainer.snapshot();

    const randomValues = new Array<Date>(100).fill(new Date(1970, 0, 1));

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
            randomValues[i] = <Date>await dateFieldValueProvider.GetRandomValue(dateFieldInfo);
        }
        done();
    });

    it("should round the time to 5 minutes", () => {
        for (let randomDate of randomValues) {
            expect(randomDate.getMinutes() % 5).toEqual(0); 
        }
    });

    afterAll(() => {
        TestContainer.restore();
    });
});