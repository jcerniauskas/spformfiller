import { IFormFiller } from "./IFormFiller";
import { injectable, inject } from "inversify";
import { IFieldInfo, IFieldInfoGatherer } from "../FieldInfo/IFieldInfo";
import { IValueProvider } from "../ValueProvider/IValueProvider";
import { IValueWriter } from "../ValueWriter/IValueWriter";

// this class gets the fields for the form and uses the type-specific value providers and value writers for each field to fill them in 
@injectable()
export default class FormFiller implements IFormFiller {
    private _valueProviderFactory: (type: string) => IValueProvider;
    private _valueWriterFactory: (type: string) => IValueWriter;
    private _fieldInfoGatherer: IFieldInfoGatherer;

    public constructor (
        @inject("Factory<IValueProvider>") valueProviderFactory: (type: string) => IValueProvider,
        @inject("Factory<IValueWriter>") valueWriterFactory: (type: string) => IValueWriter,
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
                const fieldValue = await valueProvider.GetRandomValue();
                valueWriter.WriteValue(fieldInfo, fieldValue);
            }
        }
    }
}