import "reflect-metadata";  // this is a required polyfill for inversify and should only be imported once in the application
import { inject, injectable, Container } from "inversify";
import SPVersion from "./Versions/SPVersion";

import { IContentTypeDeterminer } from "./ContentTypeDetermination/IContentTypeInfo";
import PageContentTypeDeterminerByField from "./ContentTypeDetermination/PageContentTypeDeterminerByField";
import { IFieldInfoGatherer } from "./FieldInfo/IFieldInfo";
import ListFieldInfoRestQuery from "./FieldInfo/ListFieldInfoRestQuery";
import { IPageContextExtractor } from "./PageContextInformation/IPageContextInformation";
import SPPageContextInfo from "./PageContextInformation/SPPageContextInfo";
import { IPageVisibilityHandler } from "./PageVisibilityHandler/IPageVisibilityHandler";
import SPFormUrlMatcher from "./PageVisibilityHandler/SPFormUrlMatcher";
import { ISPRestAPI } from "./SPRestAPI/ISPRestAPI";
import SPRestAPI from "./SPRestAPI/SPRestAPI";
import { IFormFiller } from "./FormFiller/IFormFiller";
import FormFiller from "./FormFiller/FormFiller";

interface KernelVersionMap {
    [version: number]: Container;
}

let versionMap: KernelVersionMap = { };

let kernel2013 = new Container();
kernel2013.bind<IContentTypeDeterminer>("IContentTypeDeterminer").to(PageContentTypeDeterminerByField);
kernel2013.bind<IFieldInfoGatherer>("IFieldInfoGatherer").to(ListFieldInfoRestQuery);
kernel2013.bind<IPageContextExtractor>("IPageContextExtractor").to(SPPageContextInfo);
kernel2013.bind<IPageVisibilityHandler>("IPageVisibilityHandler").to(SPFormUrlMatcher);
kernel2013.bind<ISPRestAPI>("ISPRestAPI").to(SPRestAPI);
kernel2013.bind<IFormFiller>("IFormFiller").to(FormFiller);

versionMap[SPVersion.SP2013] = kernel2013;

export default class ContainersForVersion {
    public static GetContainerForVersion(version: SPVersion): Container {
        return versionMap[version];
    }
}