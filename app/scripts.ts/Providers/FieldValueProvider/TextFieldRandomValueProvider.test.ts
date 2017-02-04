import TestContainer from "../../test/inversify.config";
import { IFieldValueProvider } from "./IFieldValueProvider";
import { IFieldInfo, ITextFieldInfo, IFieldInfoGatherer } from './../../FieldInfo/IFieldInfo';
import TextFieldRandomValueProvider from "./TextFieldRandomValueProvider";

describe("TextFieldRandomValueProvider", () => {
    TestContainer.snapshot();

    let textFieldInfos: ITextFieldInfo[];

    const fieldInfoGatherer = TestContainer.get<IFieldInfoGatherer>("IFieldInfoGatherer");
    const textFieldValueProvider = TestContainer.bindAndGetSpecificInstance<IFieldValueProvider>("IFieldValueProvider", TextFieldRandomValueProvider);

    beforeAll(async (done) => {
        const fieldInfos = await fieldInfoGatherer.GetVisibleEditableFieldInfo();
        textFieldInfos = <ITextFieldInfo[]>fieldInfos.filter(fieldInfo => fieldInfo.Type === "Text");
        if (textFieldInfos.length && textFieldInfos.length < 1) {
            throw new Error("There are not enough text fields for the test to run");
        }
        done();
    });

    it("should obey MaxLength property", async (done) => {
        const fieldInfosWithMaxLength = textFieldInfos.filter(fieldInfo => fieldInfo.MaxLength);
        if (fieldInfosWithMaxLength.length && fieldInfosWithMaxLength.length < 1) {
            throw new Error("There are not enough text fields with MaxLength property for the test to run");
        }

        fieldInfosWithMaxLength.forEach(async (fieldInfo) => {
            const randomValue: string = await textFieldValueProvider.GetRandomValue(fieldInfo);
            expect(randomValue.length).toBeLessThanOrEqual(fieldInfo.MaxLength);
        });

        done();
    });

    afterAll(() => {
        TestContainer.restore();
    });
});