import TestContainer from "../../test/inversify.config";
import { IFieldValueWriter } from "./IFieldValueWriter";
import { DateFieldValueWriter } from "./DateFieldValueWriter";
import { IFieldInfo, IDateFieldInfo, DateFormat } from "../../FieldInfo/IFieldInfo";

describe("DateFieldValueWriter", () => {
    TestContainer.snapshot();

    const testDate = new Date(2017, 1, 11, 18, 5, 58, 187);
    const dateFieldValueWriter = TestContainer.bindAndGetSpecificInstance<IFieldValueWriter>("IFieldValueWriter", DateFieldValueWriter);

    it("should fill date field with date value", () => {
        loadFixtures("Providers/FieldValueWriter/test/fixtures/FormWithAllFields.html");
        const dateFieldInfo = <IDateFieldInfo> {
                        InternalName: "SPF_x0020_Date",
                        Title: "SPF Date",
                        Id: "745b568b-f30f-4f21-b913-61a2adbe2e94",
                        Hidden: false,
                        DateFormat: DateFormat.DateOnly,
                    };

        dateFieldValueWriter.WriteValue(dateFieldInfo, testDate);
        let elem = $("input[id='SPF_x0020_Date_745b568b-f30f-4f21-b913-61a2adbe2e94_$DateTimeFieldDate']");
        expect(elem).toHaveValue("2/11/2017");
    });

    it("should fill date and time field with date value and a time value", () => {
        loadFixtures("Providers/FieldValueWriter/test/fixtures/FormWithAllFields.html");
        const dateAndTimeFieldInfo = <IDateFieldInfo> {
                        InternalName: "SPF_x0020_Date_x0020_time",
                        Title: "SPF Date time",
                        Id: "dfa5fdf4-a2ac-48db-8b0b-987dfedc4ade",
                        Hidden: false,
                        DateFormat: DateFormat.DateAndTime,
                    };

        dateFieldValueWriter.WriteValue(dateAndTimeFieldInfo, testDate);
        expect($("input[id='SPF_x0020_Date_x0020_time_dfa5fdf4-a2ac-48db-8b0b-987dfedc4ade_$DateTimeFieldDate']")).toHaveValue("2/11/2017");
        expect($("select[id='SPF_x0020_Date_x0020_time_dfa5fdf4-a2ac-48db-8b0b-987dfedc4ade_$DateTimeFieldDateHours']")).toHaveValue("18");
        expect($("select[id='SPF_x0020_Date_x0020_time_dfa5fdf4-a2ac-48db-8b0b-987dfedc4ade_$DateTimeFieldDateMinutes']")).toHaveValue("05");
    });
    
    afterAll(() => {
        TestContainer.restore();
    });
});