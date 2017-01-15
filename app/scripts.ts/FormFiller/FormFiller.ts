import { IFormFiller } from "./IFormFiller";
import { injectable, inject } from "inversify";
import { IFieldInfo, IFieldInfoGatherer } from "../FieldInfo/IFieldInfo";
import { IValueProvider } from "../ValueProvider/IValueProvider";
import { IValueWriter } from "../ValueWriter/IValueWriter";

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
        let visibleEditableFields = await this._fieldInfoGatherer.GetVisibleEditableFieldInfo();
        for (let fieldInfo of visibleEditableFields) {
            let valueProvider = this._valueProviderFactory(fieldInfo.Type);
            let valueWriter = this._valueWriterFactory(fieldInfo.Type);

            if (valueProvider !== null && valueWriter !== null) {
                let fieldValue = await valueProvider.GetRandomValue();
                valueWriter.WriteValue(fieldInfo, fieldValue);
            }
        }
    }
}