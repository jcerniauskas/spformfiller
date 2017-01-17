import { IPageVisibilityHandler, IChromeChangeEventInfo } from "./IPageVisibilityHandler";
import { injectable } from "inversify";

// this class determines whether the current chrome tab URL matches SharePoint's EditForm or NewForm pages and whether the page action should be shown
@injectable()
export default class SPFormUrlMatcher implements IPageVisibilityHandler {
    public ShouldShowPage(changeEventInfo: IChromeChangeEventInfo): boolean {
        let beforeQueryString = changeEventInfo.tab.url.split("?")[0];
        let pageName = beforeQueryString.split("/").slice(-1)[0];

        // TODO: change into more robust handling instead of matching by URL
        if (pageName === "EditForm.aspx" || pageName === "NewForm.aspx") {
            return true;
        }

        return false;
    }
}