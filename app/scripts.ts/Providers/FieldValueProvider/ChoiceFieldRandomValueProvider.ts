import { IFieldInfo, IChoiceFieldInfo } from "./../../FieldInfo/IFieldInfo";
import { IFieldValueProvider } from "./IFieldValueProvider";
import { injectable } from "inversify";
import { Random } from "../../Utils/Random";

// this class returns a random choice from the field's choice list
@injectable()
export class ChoiceFieldRandomValueProvider implements IFieldValueProvider {
    public async GetRandomValue(fieldInfo: IChoiceFieldInfo): Promise<any> {
        return Random.RandomChoice(fieldInfo.Choices);
    }
}