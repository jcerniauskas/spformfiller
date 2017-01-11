import TestContainer from "../test/inversify.config";
import SPFormUrlMatcher from "./SPFormUrlMatcher";
import { IChromeChangeEventInfo, IPageVisibilityHandler } from "./IPageVisibilityHandler";

describe("SPFormUrlMatcher", () => {
    TestContainer.snapshot();

    TestContainer.unbind("IPageVisibilityHandler");
    TestContainer.bind<IPageVisibilityHandler>("IPageVisibilityHandler").to(SPFormUrlMatcher);
    let formUrlMatcher = TestContainer.get<IPageVisibilityHandler>("IPageVisibilityHandler");

    let mockChromeChangeEvenInfo = function(url: string) { return <IChromeChangeEventInfo> {tabId: 0, changeInfo: null, tab: {url: url} } }
    let testUrl = function(url: string) { return formUrlMatcher.ShouldShowPage(mockChromeChangeEvenInfo(url)); }

    it("should find 'EditForm' page", () => {
        expect(testUrl("https://affectolithuania.sharepoint.com/sites/cernijusdev/Documents/Forms/EditForm.aspx?ID=1")).toBe(true);
    });

    it("should find 'EditForm' page with additional querystring parameters", () => {
        expect(testUrl("https://affectolithuania.sharepoint.com/sites/cernijusdev/Documents/Forms/EditForm.aspx?ID=1&RootFolder=/")).toBe(true);
    });

    it("should find 'NewForm' page", () => {
        expect(testUrl("https://affectolithuania.sharepoint.com/sites/cernijusdev/Documents/Forms/NewForm.aspx")).toBe(true);
    });

    it("should find 'NewForm' page with some querystring parameters", () => {
        expect(testUrl("https://affectolithuania.sharepoint.com/sites/cernijusdev/Documents/Forms/NewForm.aspx?RootFolder=/")).toBe(true);
    });

    it("should ignore 'DispForm' page", () => {
        expect(testUrl("https://affectolithuania.sharepoint.com/sites/cernijusdev/Documents/Forms/DispForm.aspx?ID=1")).toBe(false);
    });

    afterAll(() => {
        TestContainer.restore();
    });
});