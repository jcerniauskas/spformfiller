import "reflect-metadata";  // this is a required polyfill for inversify and should only be imported once in the application
import { inject, injectable, Container, interfaces } from "inversify";
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
import { IValueProvider } from "./ValueProvider/IValueProvider";
import LoremIpsumTextProvider from "./ValueProvider/LoremIpsumTextProvider";
import { IValueWriter } from "./ValueWriter/IValueWriter";
import TextFieldValueWriter from "./ValueWriter/TextFieldValueWriter";

interface KernelVersionMap {
    [version: number]: Container;
}

let versionMap: KernelVersionMap = { };

let kernel2013 = new Container();
kernel2013.bind<IContentTypeDeterminer>("IContentTypeDeterminer").to(PageContentTypeDeterminerByField).inSingletonScope();
kernel2013.bind<IFieldInfoGatherer>("IFieldInfoGatherer").to(ListFieldInfoRestQuery).inSingletonScope();
kernel2013.bind<IPageContextExtractor>("IPageContextExtractor").to(SPPageContextInfo).inSingletonScope();
kernel2013.bind<IPageVisibilityHandler>("IPageVisibilityHandler").to(SPFormUrlMatcher).inSingletonScope();
kernel2013.bind<ISPRestAPI>("ISPRestAPI").to(SPRestAPI).inSingletonScope();
kernel2013.bind<IFormFiller>("IFormFiller").to(FormFiller).inSingletonScope();

// bind value providers and value writers to their field types
kernel2013.bind<IValueProvider>("IValueProvider").to(LoremIpsumTextProvider).inSingletonScope().whenTargetNamed("Text");
kernel2013.bind<interfaces.Factory<IValueProvider>>("Factory<IValueProvider>").toFactory<IValueProvider>((context) => {
    return (type: string) => {
        let typedProvider = context.container.getNamed<IValueProvider>("IValueProvider", type);
        return typedProvider;
    };
});
kernel2013.bind<IValueWriter>("IValueWriter").to(TextFieldValueWriter).inSingletonScope().whenTargetNamed("Text");
kernel2013.bind<interfaces.Factory<IValueWriter>>("Factory<IValueWriter>").toFactory<IValueWriter>((context) => {
    return (type: string) => {
        let typedWriter = context.container.getNamed<IValueWriter>("IValueWriter", type);
        return typedWriter;
    };
});

versionMap[SPVersion.SP2013] = kernel2013;

export default class ContainersForVersion {
    public static GetContainerForVersion(version: SPVersion): Container {
        return versionMap[version];
    }
}