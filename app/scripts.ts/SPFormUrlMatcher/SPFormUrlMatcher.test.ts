import SPFormUrlMatcher from "./SPFormUrlMatcher";

describe("SPFormUrlMatcher", () => {
    it("should find 'EditForm' page", () => {
        expect(SPFormUrlMatcher.IsSPFormUrl("https://affectolithuania.sharepoint.com/sites/cernijusdev/Documents/Forms/EditForm.aspx?ID=1")).toBe(true);
    });

    it("should find 'EditForm' page with additional querystring parameters", () => {
        expect(SPFormUrlMatcher.IsSPFormUrl("https://affectolithuania.sharepoint.com/sites/cernijusdev/Documents/Forms/EditForm.aspx?ID=1&RootFolder=/")).toBe(true);
    });

    it("should find 'NewForm' page", () => {
        expect(SPFormUrlMatcher.IsSPFormUrl("https://affectolithuania.sharepoint.com/sites/cernijusdev/Documents/Forms/NewForm.aspx")).toBe(true);
    });

    it("should find 'NewForm' page with some querystring parameters", () => {
        expect(SPFormUrlMatcher.IsSPFormUrl("https://affectolithuania.sharepoint.com/sites/cernijusdev/Documents/Forms/NewForm.aspx?RootFolder=/")).toBe(true);
    });

    it("should ignore 'DispForm' page", () => {
        expect(SPFormUrlMatcher.IsSPFormUrl("https://affectolithuania.sharepoint.com/sites/cernijusdev/Documents/Forms/DispForm.aspx?ID=1")).toBe(false);
    });
});