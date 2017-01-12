import Container from "../inversify.config";
import SPVersion from "../Versions/SPVersion";
import { ISPRestAPI } from "../SPRestAPI/ISPRestAPI";
import MockSPRestAPI from "../SPRestAPI/test/MockSPRestAPI";
import ContainerExtensions from "./ContainerExtensions";

let testContainer = Container.GetContainerForVersion(SPVersion.SP2013);
testContainer.unbind("ISPRestAPI");
testContainer.bind<ISPRestAPI>("ISPRestAPI").to(MockSPRestAPI);

export default ContainerExtensions.ExtendContainer(testContainer);