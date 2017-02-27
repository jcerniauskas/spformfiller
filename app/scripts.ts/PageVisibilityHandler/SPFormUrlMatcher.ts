import { IPageVisibilityHandler, IChromeChangeEventInfo } from "./IPageVisibilityHandler";
import { injectable } from "inversify";

// this class determines whether the current chrome tab URL matches SharePoint's EditForm or NewForm pages and whether the page action should be shown
@injectable()
export class SPFormUrlMatcher implements IPageVisibilityHandler {
    public ShouldShowPage(changeEventInfo: IChromeChangeEventInfo): boolean {
        const beforeQueryString = changeEventInfo.tab.url.split("?")[0];
        const pageName = beforeQueryString.split("/").slice(-1)[0];

        // TODO: change into more robust handling instead of matching by URL
        if (pageName === "EditForm.aspx" || pageName === "NewForm.aspx" || pageName === "NewDocSet.aspx") {
            return true;
        }

        return false;
    }
}