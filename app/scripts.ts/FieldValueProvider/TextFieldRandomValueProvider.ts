import { IFieldInfo } from './../FieldInfo/IFieldInfo';
import { IFieldValueProvider } from "./IFieldValueProvider";
import { injectable } from "inversify";
import Random from "../Utils/Random";
import LoremIpsumTextProvider from "../RandomValueProvider/LoremIpsumTextProvider";

// this class returns a random sentence of 3 to 5 words for filling in small text fields
@injectable()
export default class TextFieldRandomValueProvider implements IFieldValueProvider {
    public GetRandomValue(fieldInfo: IFieldInfo): Promise<any> {
        const randomSentence = LoremIpsumTextProvider.GetRandomSentence(3, 5);

        return Promise.resolve(randomSentence);
    }
}