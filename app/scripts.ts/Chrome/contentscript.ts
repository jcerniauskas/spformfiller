import PageContextScriptInjector from "./Helpers/PageContextScriptInjector";
import { FillFormMessage, FillFormMessageResponse } from "./Helpers/MessageInterface";

let scriptInjectionPromise: Promise<void>;

chrome.runtime.onMessage.addListener(
  (message, sender, sendResponse) => {
    const fillFormMessage = <FillFormMessage> message;
    if (fillFormMessage.FillForm) {

        // make sure that we load the prerequisite scripts before calling the actual "FillFormFields" function
        // we only want to load them once, hence the promise chaining and checking if the promise has been initialized
        if (!scriptInjectionPromise) {
            scriptInjectionPromise = PageContextScriptInjector.InjectChromeExtensionScript("scripts/vendor/jquery.min.js").then(() => {
                return PageContextScriptInjector.InjectChromeExtensionScript("scripts/injectionscript.js");
            });
        }

        scriptInjectionPromise.then(() => {
            PageContextScriptInjector.InjectFunctionCall("SPFormFiller.injectionscript.default.FillFormFields").then(() => {
                sendResponse(<FillFormMessageResponse> { FormFilled : true });
            });
        });
    }

    // we return true to indicate that we will send reponse asynchronously
    return true;
});