import { IFieldInfo } from "./../FieldInfo/IFieldInfo";
import { IFieldValueProvider } from "./IFieldValueProvider";
import { injectable } from "inversify";
import Random from "../Utils/Random";
import LoremIpsumTextProvider from "../RandomValueProvider/LoremIpsumTextProvider";

// this class returns a random sentence of 10 to 20 words for filling in multiple lines of text fields
@injectable()
export default class NoteFieldRandomValueProvider implements IFieldValueProvider {
    public async GetRandomValue(fieldInfo: IFieldInfo): Promise<any> {
        const randomSentence: string = await LoremIpsumTextProvider.GetRandomSentence(10, 20);

        return Promise.resolve(randomSentence);
    }
}