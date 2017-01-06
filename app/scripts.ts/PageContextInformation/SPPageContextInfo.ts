import { IPageContextInformation, IPageContextExtractor } from "./IPageContextInformation";
import { injectable } from "inversify";

@injectable()
export default class SPPageContextInfo implements IPageContextExtractor {
    public GetPageContextInformation(): IPageContextInformation {
        return <IPageContextInformation> {
            WebServerRelativeUrl: _spPageContextInfo.webServerRelativeUrl,
            ListId: _spPageContextInfo.pageListId
        }
    }
}