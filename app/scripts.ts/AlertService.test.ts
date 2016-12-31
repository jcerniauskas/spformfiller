import AlertService from "./AlertService";

describe("Alert service messages", () => {
    let alertService = new AlertService();

    it("should have a default message of 'Default'", () => {
        expect(alertService.GetDefaultMessage()).toEqual("Default");
    });
});