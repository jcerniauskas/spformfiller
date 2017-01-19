// this class contains methods to inject script or execute function from chrome extension directly in the page's context
// (and therefore be able to use its global variables, security context, etc.) as opposed to running in content script
// isolated environment
export default class PageContextScriptInjector {
    public static InjectChromeExtensionScript(chromeResourceUrl: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.src = chrome.extension.getURL(chromeResourceUrl);
            script.onload = function() {
                resolve();
            };
            (document.head || document.documentElement).appendChild(script);
        });
    }

    public static InjectFunctionCall(functionName: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const actualCode = `${functionName}();`;
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.textContent = actualCode;
            script.onload = function() {
                resolve();
            };
            (document.head || document.documentElement).appendChild(script);
            script.remove();
        });
    }
}