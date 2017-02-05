///<reference path="../../Definitions/Microsoft.SharePoint.Taxonomy.d.ts"/>

import { IFieldValueWriter } from "./IFieldValueWriter";
import { IFieldInfo } from "../../FieldInfo/IFieldInfo";
import { injectable } from "inversify";
import { FieldValueWriterBase } from "./FieldValueWriterBase";
import { Term } from "../../Services/IManagedMetadataService";

// this class writes a value to a taxonomy field
@injectable()
export default class ManagedMetadataFieldValueWriter extends FieldValueWriterBase {
    public WriteValue(fieldInfo: IFieldInfo, value: Term): void {
        const editableRegionSelector = `[id='${fieldInfo.InternalName}_$containereditableRegion']`;
        const editableRegionInputControl = super.GetInputControl(editableRegionSelector);

        // imitate that we are writing on the editor control
        editableRegionInputControl.html(`"${value.Name}"`);

        // force taxonomy field to validate the input
        const taxonomyControlObject = editableRegionInputControl.closest(`[id='${fieldInfo.InternalName}_$container']`);
        super.ThrowErrorIfNoElement(taxonomyControlObject, `Could not find taxonomy control object for field ${fieldInfo.Title}`);
        if (taxonomyControlObject.length > 0) {
            const taxonomyObject = new Microsoft.SharePoint.Taxonomy.ControlObject(taxonomyControlObject.get(0));
            taxonomyObject.validateAll();
        }
    }
}