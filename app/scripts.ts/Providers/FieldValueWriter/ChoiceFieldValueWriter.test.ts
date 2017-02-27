import TestContainer from "../../test/inversify.config";
import { IFieldValueWriter } from "./IFieldValueWriter";
import { ChoiceFieldValueWriter } from "./ChoiceFieldValueWriter";
import { IFieldInfo, IChoiceFieldInfo, ChoiceFormat } from "../../FieldInfo/IFieldInfo";

describe("ChoiceFieldValueWriter", () => {
    TestContainer.snapshot();

    const choiceFieldValueWriter = TestContainer.bindAndGetSpecificInstance<IFieldValueWriter>("IFieldValueWriter", ChoiceFieldValueWriter);

    it("should fill a normal dropdown field with value", () => {
        loadFixtures("Providers/FieldValueWriter/test/fixtures/FormWithAllFields.html");
        const normalChoiceFieldInfo = <IChoiceFieldInfo> {
                        InternalName: "SPF_x0020_choose",
                        Title: "SPF choose",
                        Id: "979a9aeb-cbfa-4cdb-b974-e5539cc9a122",
                        Hidden: false,
                        ChoiceFormat: ChoiceFormat.DropDown,
                        Choices: [
                            "Lorem",
                            "Ipsum",
                            "Other"
                        ],
                    };

        const value = "Ipsum";
        choiceFieldValueWriter.WriteValue(normalChoiceFieldInfo, value);
        expect($("[id='SPF_x0020_choose_979a9aeb-cbfa-4cdb-b974-e5539cc9a122_$DropDownChoice']")).toHaveValue(value);
    });

    it("should fill a fill-in dropdown field with a choice value", () => {
        loadFixtures("Providers/FieldValueWriter/test/fixtures/FormWithAllFields.html");
        const fillinChoiceFieldInfo = <IChoiceFieldInfo> {
                        InternalName: "SPF_x0020_choice_x0020_fillin",
                        Title: "SPF choice fillin",
                        Id: "11761d43-f6b9-494c-b17f-c524486943f5",
                        ChoiceFormat: ChoiceFormat.DropDown,
                        FillInChoice: true,
                        Hidden: false,
                        Choices: [
                            "Not that many choices"
                        ],
                    };

        const value = "Not that many choices";
        choiceFieldValueWriter.WriteValue(fillinChoiceFieldInfo, value);
        expect($("[id='SPF_x0020_choice_x0020_fillin_11761d43-f6b9-494c-b17f-c524486943f5_DropDownButton'")).toBeChecked();
        expect($("[id='SPF_x0020_choice_x0020_fillin_11761d43-f6b9-494c-b17f-c524486943f5_$DropDownChoice']")).toHaveValue(value);
    });

    it("should fill a radio button choice field with a choice value", () => {
        loadFixtures("Providers/FieldValueWriter/test/fixtures/FormWithAllFields.html");
        const radioChoiceFieldInfo = <IChoiceFieldInfo> {
                        InternalName: "SPF_x0020_Choose_x0020_radio",
                        Title: "SPF Choose radio",
                        Id: "c602f3b1-f915-4efa-9fbb-125074841726",
                        Hidden: false,
                        ChoiceFormat: ChoiceFormat.Radio,
                        Choices: [
                            "First choice",
                            "Better choice",
                            "Last"
                        ],
                    };

        const value = "Better choice";
        choiceFieldValueWriter.WriteValue(radioChoiceFieldInfo, value);
        expect($("input[id='SPF_x0020_Choose_x0020_radio_c602f3b1-f915-4efa-9fbb-125074841726_$RadioButtonChoiceField1']")).toBeChecked();
    });

    it("should fill a multi checkbox field with a choice value", () => {
        loadFixtures("Providers/FieldValueWriter/test/fixtures/FormWithAllFields.html");
        const checkboxChoiceFieldInfo = <IChoiceFieldInfo> {
                        InternalName: "SPF_x0020_choose_x0020_check",
                        Title: "SPF choose check",
                        Id: "8f8a48ca-0702-443e-9c6a-09613b334853",
                        Hidden: false,
                        ChoiceFormat: ChoiceFormat.CheckBoxes,
                        Choices: [
                            "Candles",
                            "Bulbs",
                            "Torches and fire"
                        ]
                    };

        const value = "Torches and fire";
        choiceFieldValueWriter.WriteValue(checkboxChoiceFieldInfo, value);
        expect($("input[id='SPF_x0020_choose_x0020_check_8f8a48ca-0702-443e-9c6a-09613b334853_MultiChoiceOption_2']")).toBeChecked();
    });
    
    afterAll(() => {
        TestContainer.restore();
    });
});