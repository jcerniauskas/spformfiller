import { INumberFieldInfo } from "./../../FieldInfo/IFieldInfo";
import TestContainer from "../../test/inversify.config";
import { IFieldValueWriter } from "./IFieldValueWriter";
import { NumberFieldValueWriter } from "./NumberFieldValueWriter";
import { IFieldInfo, ITextFieldInfo } from "../../FieldInfo/IFieldInfo";

describe("NumberFieldValueWriter", () => {
    TestContainer.snapshot();

    const textFieldValueWriter = TestContainer.bindAndGetSpecificInstance<IFieldValueWriter>("IFieldValueWriter", NumberFieldValueWriter);

    it("should fill Number input with a specified value", () => {
        loadFixtures("Providers/FieldValueWriter/test/fixtures/FormWithAllFields.html");
        const titleFieldInfo = <INumberFieldInfo> {
                        InternalName: "SPF_x0020_no_x0020_limit_x0020_number",
                        Title: "SPF no limit number",
                        Id: "c1024f30-756e-4155-bdf6-626a16f47fb6",
                        Hidden: false,
                    };

        const testValue = 1546;
        textFieldValueWriter.WriteValue(titleFieldInfo, testValue);
        expect($("[id='SPF_x0020_no_x0020_limit_x0020_number_c1024f30-756e-4155-bdf6-626a16f47fb6_$NumberField']")).toHaveValue(testValue.toString());
    });
    
    afterAll(() => {
        TestContainer.restore();
    });
});