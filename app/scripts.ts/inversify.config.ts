import "reflect-metadata";  // this is a required polyfill for inversify and should only be imported once in the application
import { inject, injectable, Container, interfaces } from "inversify";
import SPVersion from "./Versions/SPVersion";

import { IContentTypeDeterminer } from "./ContentTypeDetermination/IContentTypeInfo";
import PageContentTypeDeterminerByField from "./ContentTypeDetermination/PageContentTypeDeterminerByField";
import CompositePageContentTypeDeterminer from "./ContentTypeDetermination/CompositePageContentTypeDeterminer";
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
import { IManagedMetadataService } from "./Services/ManagedMetadata/IManagedMetadataService";
import ManagedMetadataService from "./Services/ManagedMetadata/ManagedMetadataService";
import { IUserService } from "./Services/User/IUserService";
import UserRESTService from "./Services/User/UserRESTService";
import { IListInfoService } from "./Services/ListInfo/IListInfoService";
import ListInfoRESTService from "./Services/ListInfo/ListInfoRESTService";

import { IFieldValueProvider } from "./Providers/FieldValueProvider/IFieldValueProvider";
import TextFieldRandomValueProvider from "./Providers/FieldValueProvider/TextFieldRandomValueProvider";
import NoteFieldRandomValueProvider from "./Providers/FieldValueProvider/NoteFieldRandomValueProvider";
import DateFieldRandomValueProvider from "./Providers/FieldValueProvider/DateFieldRandomValueProvider";
import ChoiceFieldRandomValueProvider from "./Providers/FieldValueProvider/ChoiceFieldRandomValueProvider";
import NumberFieldRandomValueProvider from "./Providers/FieldValueProvider/NumberFieldRandomValueProvider";
import ManagedMetadataFieldRandomValueProvider from "./Providers/FieldValueProvider/ManagedMetadataFieldRandomValueProvider";
import PeopleFieldRandomValueProvider from "./Providers/FieldValueProvider/PeopleFieldRandomValueProvider";
import { IFieldValueWriter } from "./Providers/FieldValueWriter/IFieldValueWriter";
import TextFieldValueWriter from "./Providers/FieldValueWriter/TextFieldValueWriter";
import NoteFieldValueWriter from "./Providers/FieldValueWriter/NoteFieldValueWriter";
import DateFieldValueWriter from "./Providers/FieldValueWriter/DateFieldValueWriter";
import ChoiceFieldValueWriter from "./Providers/FieldValueWriter/ChoiceFieldValueWriter";
import NumberFieldValueWriter from "./Providers/FieldValueWriter/NumberFieldValueWriter";
import ManagedMetadataFieldValueWriter from "./Providers/FieldValueWriter/ManagedMetadataFieldValueWriter";
import PeopleFieldValueWriter from "./Providers/FieldValueWriter/PeopleFieldValueWriter";

interface KernelVersionMap {
    [version: number]: Container;
}

// this will hold the mapping of versions to DI containers
const versionMap: KernelVersionMap = { };

const kernel2013 = new Container();
kernel2013.bind<IContentTypeDeterminer>("IContentTypeDeterminer").to(CompositePageContentTypeDeterminer).inSingletonScope();
kernel2013.bind<IFieldInfoGatherer>("IFieldInfoGatherer").to(ListFieldInfoRestQuery).inSingletonScope();
kernel2013.bind<IPageContextExtractor>("IPageContextExtractor").to(SPPageContextInfo).inSingletonScope();
kernel2013.bind<IPageVisibilityHandler>("IPageVisibilityHandler").to(SPFormUrlMatcher).inSingletonScope();
kernel2013.bind<ISPRestAPI>("ISPRestAPI").to(SPRestAPI).inSingletonScope();
kernel2013.bind<IFormFiller>("IFormFiller").to(FormFiller).inSingletonScope();
kernel2013.bind<IManagedMetadataService>("IManagedMetadataService").to(ManagedMetadataService).inSingletonScope();
kernel2013.bind<IUserService>("IUserService").to(UserRESTService).inSingletonScope();
kernel2013.bind<IListInfoService>("IListInfoService").to(ListInfoRESTService).inSingletonScope();

// bind value providers and value writers to their field types
kernel2013.bind<IFieldValueProvider>("IFieldValueProvider").to(TextFieldRandomValueProvider).inSingletonScope().whenTargetNamed("Text");
kernel2013.bind<IFieldValueProvider>("IFieldValueProvider").to(NoteFieldRandomValueProvider).inSingletonScope().whenTargetNamed("Note");
kernel2013.bind<IFieldValueProvider>("IFieldValueProvider").to(DateFieldRandomValueProvider).inSingletonScope().whenTargetNamed("DateTime");
kernel2013.bind<IFieldValueProvider>("IFieldValueProvider").to(ChoiceFieldRandomValueProvider).inSingletonScope().whenTargetNamed("Choice");
kernel2013.bind<IFieldValueProvider>("IFieldValueProvider").to(NumberFieldRandomValueProvider).inSingletonScope().whenTargetNamed("Number");
kernel2013.bind<IFieldValueProvider>("IFieldValueProvider").to(ManagedMetadataFieldRandomValueProvider).inSingletonScope().whenTargetNamed("TaxonomyFieldType");
kernel2013.bind<IFieldValueProvider>("IFieldValueProvider").to(PeopleFieldRandomValueProvider).inSingletonScope().whenTargetNamed("User");
kernel2013.bind<interfaces.Factory<IFieldValueProvider>>("Factory<IFieldValueProvider>").toFactory<IFieldValueProvider>((context) => {
    return (type: string) => {
        if (context.container.isBoundNamed("IFieldValueProvider", type)) {
            const typedProvider = context.container.getNamed<IFieldValueProvider>("IFieldValueProvider", type);
            return typedProvider;
        } else {
            return null;
        }
    };
});
kernel2013.bind<IFieldValueWriter>("IFieldValueWriter").to(TextFieldValueWriter).inSingletonScope().whenTargetNamed("Text");
kernel2013.bind<IFieldValueWriter>("IFieldValueWriter").to(NoteFieldValueWriter).inSingletonScope().whenTargetNamed("Note");
kernel2013.bind<IFieldValueWriter>("IFieldValueWriter").to(DateFieldValueWriter).inSingletonScope().whenTargetNamed("DateTime");
kernel2013.bind<IFieldValueWriter>("IFieldValueWriter").to(ChoiceFieldValueWriter).inSingletonScope().whenTargetNamed("Choice");
kernel2013.bind<IFieldValueWriter>("IFieldValueWriter").to(NumberFieldValueWriter).inSingletonScope().whenTargetNamed("Number");
kernel2013.bind<IFieldValueWriter>("IFieldValueWriter").to(ManagedMetadataFieldValueWriter).inSingletonScope().whenTargetNamed("TaxonomyFieldType");
kernel2013.bind<IFieldValueWriter>("IFieldValueWriter").to(PeopleFieldValueWriter).inSingletonScope().whenTargetNamed("User");
kernel2013.bind<interfaces.Factory<IFieldValueWriter>>("Factory<IFieldValueWriter>").toFactory<IFieldValueWriter>((context) => {
    return (type: string) => {
        if (context.container.isBoundNamed("IFieldValueWriter", type)) {
            const typedWriter = context.container.getNamed<IFieldValueWriter>("IFieldValueWriter", type);
            return typedWriter;
        } else {
            return null;
        }
    };
});

versionMap[SPVersion.SP2013] = kernel2013;

export default class ContainersForVersion {
    public static GetContainerForVersion(version: SPVersion): Container {
        return versionMap[version];
    }
}