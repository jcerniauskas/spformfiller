export default class SPFormUrlMatcher {
    public static IsSPFormUrl(url: string): boolean {
        let beforeQueryString = url.split("?")[0];
        let pageName = beforeQueryString.split("/").slice(-1)[0];

        // TODO: change into more robust handling instead of matching by URL
        if (pageName === "EditForm.aspx" || pageName === "NewForm.aspx") {
            return true;
        }

        return false;
    }
}