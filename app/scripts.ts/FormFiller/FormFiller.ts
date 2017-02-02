import { IFormFiller } from "./IFormFiller";
import { injectable, inject } from "inversify";
import { IFieldInfo, IFieldInfoGatherer } from "../FieldInfo/IFieldInfo";
import { IFieldValueProvider } from "../Providers/FieldValueProvider/IFieldValueProvider";
import { IFieldValueWriter } from "../Providers/FieldValueWriter/IFieldValueWriter";

// this class gets the fields for the form and uses the type-specific value providers and value writers for each field to fill them in 
@injectable()
export default class FormFiller implements IFormFiller {
    public constructor(
        @inject("Factory<IFieldValueProvider>") private _valueProviderFactory: (type: string) => IFieldValueProvider,
        @inject("Factory<IFieldValueWriter>") private _valueWriterFactory: (type: string) => IFieldValueWriter,
        @inject("IFieldInfoGatherer") private _fieldInfoGatherer: IFieldInfoGatherer
    ) {

    }

    public async FillFormFields(): Promise<void> {
        const visibleEditableFields = await this._fieldInfoGatherer.GetVisibleEditableFieldInfo();
        for (let fieldInfo of visibleEditableFields) {
            const valueProvider = this._valueProviderFactory(fieldInfo.Type);
            const valueWriter = this._valueWriterFactory(fieldInfo.Type);

            if (valueProvider && valueWriter) {
                const fieldValue = await valueProvider.GetRandomValue(fieldInfo);
                valueWriter.WriteValue(fieldInfo, fieldValue);
            }
        }
    }
}