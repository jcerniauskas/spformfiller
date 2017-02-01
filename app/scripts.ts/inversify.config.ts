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
import { IFieldValueProvider } from "./FieldValueProvider/IFieldValueProvider";
import TextFieldRandomValueProvider from "./FieldValueProvider/TextFieldRandomValueProvider";
import { IFieldValueWriter } from "./FieldValueWriter/IFieldValueWriter";
import TextFieldValueWriter from "./FieldValueWriter/TextFieldValueWriter";

interface KernelVersionMap {
    [version: number]: Container;
}

// this will hold the mapping of versions to DI containers
const versionMap: KernelVersionMap = { };

const kernel2013 = new Container();
kernel2013.bind<IContentTypeDeterminer>("IContentTypeDeterminer").to(PageContentTypeDeterminerByField).inSingletonScope();
kernel2013.bind<IFieldInfoGatherer>("IFieldInfoGatherer").to(ListFieldInfoRestQuery).inSingletonScope();
kernel2013.bind<IPageContextExtractor>("IPageContextExtractor").to(SPPageContextInfo).inSingletonScope();
kernel2013.bind<IPageVisibilityHandler>("IPageVisibilityHandler").to(SPFormUrlMatcher).inSingletonScope();
kernel2013.bind<ISPRestAPI>("ISPRestAPI").to(SPRestAPI).inSingletonScope();
kernel2013.bind<IFormFiller>("IFormFiller").to(FormFiller).inSingletonScope();

// bind value providers and value writers to their field types
kernel2013.bind<IFieldValueProvider>("IFieldValueProvider").to(TextFieldRandomValueProvider).inSingletonScope().whenTargetNamed("Text");
kernel2013.bind<interfaces.Factory<IFieldValueProvider>>("Factory<IFieldValueProvider>").toFactory<IFieldValueProvider>((context) => {
    return (type: string) => {
        const typedProvider = context.container.getNamed<IFieldValueProvider>("IFieldValueProvider", type);
        return typedProvider;
    };
});
kernel2013.bind<IFieldValueWriter>("IFieldValueWriter").to(TextFieldValueWriter).inSingletonScope().whenTargetNamed("Text");
kernel2013.bind<interfaces.Factory<IFieldValueWriter>>("Factory<IFieldValueWriter>").toFactory<IFieldValueWriter>((context) => {
    return (type: string) => {
        const typedWriter = context.container.getNamed<IFieldValueWriter>("IFieldValueWriter", type);
        return typedWriter;
    };
});

versionMap[SPVersion.SP2013] = kernel2013;

export default class ContainersForVersion {
    public static GetContainerForVersion(version: SPVersion): Container {
        return versionMap[version];
    }
}