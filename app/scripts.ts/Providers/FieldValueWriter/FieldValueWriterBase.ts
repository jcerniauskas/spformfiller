import { injectable } from "inversify";
import { IFieldInfo } from "./../../FieldInfo/IFieldInfo";
import { IFieldValueWriter } from "./IFieldValueWriter";

// a base abstract class for value writers which contains some commonly used functions
@injectable()
export abstract class FieldValueWriterBase implements IFieldValueWriter {
    public abstract WriteValue(fieldInfo: IFieldInfo, value: any): void;

    protected TryGetInputControl(selector: string): JQuery {
        try {
            return this.GetInputControl(selector);
        } catch (e) {
            return null;
        }
    }

    protected GetInputControl(selector: string): JQuery {
        const inputControl = $(selector);
        this.ThrowErrorIfNoElement(inputControl, "Cannot find field to fill with value");

        if (inputControl.length > 1) {
            throw new Error("More than one field found");
        }

        return inputControl;
    }

    protected TryGetInputControlForField(fieldInfo: IFieldInfo, type: string, idSuffix: string): JQuery {
        try {
            return this.GetInputControlForField(fieldInfo, type, idSuffix);
        } catch (e) {
            return null;
        }
    }

    protected GetInputControlForField(fieldInfo: IFieldInfo, type: string, idSuffix: string): JQuery {
        const idSelector = this.GetIdSelectorForInputControl(fieldInfo);
        const selector = `${type}[id='${idSelector}_${idSuffix}']`;
        return this.GetInputControl(selector);
    }

    protected GetIdSelectorForInputControl(fieldInfo: IFieldInfo): string {
        return `${fieldInfo.InternalName}_${fieldInfo.Id.toLowerCase()}`;
    }

    protected ThrowErrorIfNoElement(element: JQuery, message?: string): void {
        if (!message) {
            message = "Cannot find field to fill with value";
        }

        if (!element || element.length < 1) {
            throw new Error(message);
        }
    }

    protected ThrowErrorIfMultiple(element: JQuery, message?: string): void {
        if (!message) {
            message = "More than one field found";
        }

        if (element.length > 1) {
            throw new Error(message);
        }
    }
}