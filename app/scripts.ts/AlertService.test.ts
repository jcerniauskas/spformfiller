import AlertService from "./AlertService";

describe("Alert service messages", () => {
    it("should have a default message of 'Default'", () => {
        expect(AlertService.GetDefaultMessage()).toEqual("Default");
    });
});