import { IFieldInfo, IManagedMetadataFieldInfo } from "./../../FieldInfo/IFieldInfo";
import { IFieldValueProvider } from "./IFieldValueProvider";
import { injectable, inject } from "inversify";
import { IManagedMetadataService } from "../../Services/IManagedMetadataService";
import Random from "../../Utils/Random";

// this class returns a random term from the field's termset
@injectable()
export default class ManagedMetadataFieldRandomValueProvider implements IFieldValueProvider {
    constructor(@inject("IManagedMetadataService") private _managedMetadataService: IManagedMetadataService) { }

    public async GetRandomValue(fieldInfo: IManagedMetadataFieldInfo): Promise<any> {
        const termsAvailableForTagging = await this._managedMetadataService.GetTermsAvailableForTagging(fieldInfo.TermSetId);
        const randomTerm = Random.RandomChoice(termsAvailableForTagging);
        return randomTerm;
    }
}