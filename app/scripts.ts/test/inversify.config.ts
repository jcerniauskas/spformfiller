import Container from "../inversify.config";
import SPVersion from "../Versions/SPVersion";
import { ISPRestAPI } from "../SPRestAPI/ISPRestAPI";
import MockSPRestAPINoContentTypes from "../SPRestAPI/test/NoContentTypes/MockSPRestAPI";
import ContainerExtensions from "./ContainerExtensions";

// this sets up the inversify container for running tests. For example, some interfaces are immediately mocked.

const testContainer = Container.GetContainerForVersion(SPVersion.SP2013);
testContainer.unbind("ISPRestAPI");
testContainer.bind<ISPRestAPI>("ISPRestAPI").to(MockSPRestAPINoContentTypes);

// we also add some additional helper methods for the test container
export default ContainerExtensions.ExtendContainer(testContainer);