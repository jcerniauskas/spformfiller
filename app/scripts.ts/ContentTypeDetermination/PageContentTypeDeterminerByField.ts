import { IContentTypeDeterminer, IContentTypeInformation } from "./IContentTypeInfo";
import { injectable, inject } from "inversify";

@injectable()
export default class PageContentTypeDeterminerByField implements IContentTypeDeterminer {
    public GetContentTypeInformation(): IContentTypeInformation {
        let contentTypeField = $("select[id$='ContentTypeChoice']");
        if (contentTypeField !== undefined && contentTypeField !== null && contentTypeField.length > 0) {
            let selectedOption = contentTypeField.find("option:selected");
            if (selectedOption !== undefined && selectedOption !== null && selectedOption.length > 0) {
                return <IContentTypeInformation> {
                    ContentTypeId: selectedOption.attr("value"),
                    ContentTypeTitle: selectedOption.val()
                };
            }
        }
    }
}