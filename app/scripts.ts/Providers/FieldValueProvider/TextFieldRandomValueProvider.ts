import { IFieldInfo, ITextFieldInfo } from "./../../FieldInfo/IFieldInfo";
import { IFieldValueProvider } from "./IFieldValueProvider";
import { injectable } from "inversify";
import { LoremIpsumTextProvider } from "../RandomValueProvider/LoremIpsumTextProvider";

// this class returns a random sentence of 3 to 5 words for filling in small text fields
@injectable()
export class TextFieldRandomValueProvider implements IFieldValueProvider {
    public async GetRandomValue(fieldInfo: ITextFieldInfo): Promise<any> {
        const randomSentence: string = await LoremIpsumTextProvider.GetRandomSentence(3, 5);

        if (fieldInfo.MaxLength) {
            return Promise.resolve(TextFieldRandomValueProvider.TruncateToMaxLength(randomSentence, fieldInfo.MaxLength));
        }
        return Promise.resolve(randomSentence);
    }

    private static TruncateToMaxLength(text: string, maxLength: number): string {
        return text.substr(0, maxLength);
    }
}