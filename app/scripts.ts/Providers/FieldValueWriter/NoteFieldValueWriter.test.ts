import TestContainer from "../../test/inversify.config";
import { IFieldValueWriter } from "./IFieldValueWriter";
import NoteFieldValueWriter from "./NoteFieldValueWriter";
import { IFieldInfo } from "../../FieldInfo/IFieldInfo";

describe("NoteFieldValueWriter", () => {
    TestContainer.snapshot();

    const noteFieldValueWriter = TestContainer.bindAndGetSpecificInstance<IFieldValueWriter>("IFieldValueWriter", NoteFieldValueWriter);

    it("should fill 'Describe more' field with a specified value", () => {
        loadFixtures("Providers/FieldValueWriter/test/fixtures/FormWithAllFields.html");
        const titleFieldInfo = <IFieldInfo> {
                        InternalName: "Describe_x0020_more",
                        Title: "Describe more",
                        Id: "18b87002-c3da-4cc2-9145-8118a4e7614c",
                        Hidden: false
                    };

        const testValue = "A much longer text value just to make sure we are above the normal 255 character limit for the single line fields. We will now repeat this a couple of times. A much longer text value just to make sure we are above the normal 255 character limit for the single line fields. We will now repeat this a couple of times. A much longer text value just to make sure we are above the normal 255 character limit for the single line fields. We will now repeat this a couple of times.";
        noteFieldValueWriter.WriteValue(titleFieldInfo, testValue);
        expect($("[id='Describe_x0020_more_18b87002-c3da-4cc2-9145-8118a4e7614c_$TextField']")).toHaveValue(testValue);
    });
    
    afterAll(() => {
        TestContainer.restore();
    });
});