import { IFormFiller } from "./IFormFiller";
import { injectable, inject } from "inversify";
import { IFieldInfo, IFieldInfoGatherer } from "../FieldInfo/IFieldInfo";
import { IFieldValueProvider } from "../Providers/FieldValueProvider/IFieldValueProvider";
import { IFieldValueWriter } from "../Providers/FieldValueWriter/IFieldValueWriter";

// this class gets the fields for the form and uses the type-specific value providers and value writers for each field to fill them in 
@injectable()
export default class FormFiller implements IFormFiller {
    private _valueProviderFactory: (type: string) => IFieldValueProvider;
    private _valueWriterFactory: (type: string) => IFieldValueWriter;
    private _fieldInfoGatherer: IFieldInfoGatherer;

    public constructor (
        @inject("Factory<IFieldValueProvider>") valueProviderFactory: (type: string) => IFieldValueProvider,
        @inject("Factory<IFieldValueWriter>") valueWriterFactory: (type: string) => IFieldValueWriter,
        @inject("IFieldInfoGatherer") fieldInfoGatherer: IFieldInfoGatherer
    ) {
        this._valueProviderFactory = valueProviderFactory;
        this._valueWriterFactory = valueWriterFactory;
        this._fieldInfoGatherer = fieldInfoGatherer;
    }

    public async FillFormFields(): Promise<void> {
        const visibleEditableFields = await this._fieldInfoGatherer.GetVisibleEditableFieldInfo();
        for (let fieldInfo of visibleEditableFields) {
            const valueProvider = this._valueProviderFactory(fieldInfo.Type);
            const valueWriter = this._valueWriterFactory(fieldInfo.Type);

            if (valueProvider && valueWriter) {
                let fieldValue: any;
                try {
                    fieldValue = await valueProvider.GetRandomValue(fieldInfo);
                } catch (e) {
                    console.log(`Getting field value failed for field '${fieldInfo.Title}'. Error message: ${e}`);
                }

                try {
                    valueWriter.WriteValue(fieldInfo, fieldValue);
                } catch (e) {
                    console.log(`Writing field value failed for field '${fieldInfo.Title}'. Error message: ${e}`);
                }
            }
        }
    }
}