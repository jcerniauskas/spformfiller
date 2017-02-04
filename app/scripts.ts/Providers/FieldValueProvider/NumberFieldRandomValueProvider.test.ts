import TestContainer from "../../test/inversify.config";
import { IFieldValueProvider } from "./IFieldValueProvider";
import { IFieldInfo, INumberFieldInfo } from './../../FieldInfo/IFieldInfo';
import NumberFieldRandomValueProvider from "./NumberFieldRandomValueProvider";

describe("NumberFieldRandomValueProvider", () => {
    TestContainer.snapshot();

    const numberFieldValueProvider = TestContainer.bindAndGetSpecificInstance<IFieldValueProvider>("IFieldValueProvider", NumberFieldRandomValueProvider);
    const timesToRepeat = 100;

    const generateNumberFieldInfoWithConstraints = (minValue: number, maxValue: number): INumberFieldInfo => {
        return <INumberFieldInfo> {
            InternalName: "TestField",
            Title: "Test field",
            Id: "c1024f30-756e-4155-bdf6-626a16f47fb6",
            Hidden: false,
            Type: "Number",
            ReadOnlyField: false,
            MinValue: minValue,
            MaxValue: maxValue,
        };
    }

    it("should return 1 to 9999 for a field which doesn't have specific MinimumValue and MaximumValue constraints", async (done) => {
        const fieldWithoutConstraints = generateNumberFieldInfoWithConstraints(-179769313486231570000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000, 179769313486231570000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000);

        // repeat the test a couple of times to be sure
        for (let i = 0; i < timesToRepeat; i++) {
            const randomValue: number = await numberFieldValueProvider.GetRandomValue(fieldWithoutConstraints);
            expect(randomValue).toBeGreaterThanOrEqual(1);
            expect(randomValue).toBeLessThanOrEqual(9999);
        }
        
        done();
    });

    it("should return 4 to 7 for a field which has these values as MinValue and MaxValue", async (done) => {
        const fieldWithConstraints = generateNumberFieldInfoWithConstraints(4, 7);

        // repeat the test a couple of times to be sure
        for (let i = 0; i < timesToRepeat; i++) {
            const randomValue: number = await numberFieldValueProvider.GetRandomValue(fieldWithConstraints);
            expect(randomValue).toBeGreaterThanOrEqual(4);
            expect(randomValue).toBeLessThanOrEqual(7);
        }
        
        done();
    });

    it("should return -100 to -50 for a field which has these values as MinValue and MaxValue", async (done) => {
        const fieldWithConstraints = generateNumberFieldInfoWithConstraints(-100, -50);

        // repeat the test a couple of times to be sure
        for (let i = 0; i < timesToRepeat; i++) {
            const randomValue: number = await numberFieldValueProvider.GetRandomValue(fieldWithConstraints);
            expect(randomValue).toBeGreaterThanOrEqual(-100);
            expect(randomValue).toBeLessThanOrEqual(-50);
        }
        
        done();
    });

    it("should return 100 to 10100 for a field which has 100 as MinimumValue, but a really large MaximumValue", async (done) => {
        const fieldWithConstraints = generateNumberFieldInfoWithConstraints(100, 179769313486231570000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000);

        // repeat the test a couple of times to be sure
        for (let i = 0; i < timesToRepeat; i++) {
            const randomValue: number = await numberFieldValueProvider.GetRandomValue(fieldWithConstraints);
            expect(randomValue).toBeGreaterThanOrEqual(100);
            expect(randomValue).toBeLessThanOrEqual(10100);
        }
        
        done();
    });

    afterAll(() => {
        TestContainer.restore();
    });
});