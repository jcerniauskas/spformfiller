import "reflect-metadata";  // this is a required polyfill for inversify and should only be imported once in the application
import { inject, injectable, Container } from "inversify";
import { IPageVisibilityHandler } from "./PageVisibilityHandler/IPageVisibilityHandler";
import SPFormUrlMatcher from "./PageVisibilityHandler/SPFormUrlMatcher";
import SPVersion from "./Versions/SPVersion";

interface KernelVersionMap {
    [version: number]: Container;
}

let versionMap: KernelVersionMap = { };

let kernel2013 = new Container();
kernel2013.bind<IPageVisibilityHandler>("IPageVisibilityHandler").to(SPFormUrlMatcher);

versionMap[SPVersion.SP2013] = kernel2013;

export default class ContainersForVersion {
    static GetContainerForVersion(version: SPVersion): Container {
        return versionMap[version];
    }
}