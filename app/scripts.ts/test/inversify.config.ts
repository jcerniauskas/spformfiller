import { ContainersForVersion } from "../inversify.config";
import { SPVersion } from "../Versions/SPVersion";
import { ISPRestAPI } from "../SPRestAPI/ISPRestAPI";
import { MockSPRestAPI as MockSPRestAPINoContentTypes } from "../SPRestAPI/test/NoContentTypes/MockSPRestAPI";
import { ContainerExtensions } from "./ContainerExtensions";
import { IManagedMetadataService } from "./../Services/ManagedMetadata/IManagedMetadataService";
import { MockManagedMetadataService } from "../Services/ManagedMetadata/test/MockManagedMetadataService";
import { IDateFormatService } from "../Services/DateFormat/IDateFormatService";
import { MockDateFormatService } from "../Services/DateFormat/MockDateFormatService";

// this sets up the inversify container for running tests. For example, some interfaces are immediately mocked.

const testContainer = ContainersForVersion.GetContainerForVersion(SPVersion.SP2013);
testContainer.unbind("ISPRestAPI");
testContainer.bind<ISPRestAPI>("ISPRestAPI").to(MockSPRestAPINoContentTypes);
testContainer.unbind("IManagedMetadataService");
testContainer.bind<IManagedMetadataService>("IManagedMetadataService").to(MockManagedMetadataService).inSingletonScope();
testContainer.unbind("IDateFormatService");
testContainer.bind<IDateFormatService>("IDateFormatService").to(MockDateFormatService).inSingletonScope();

// we also add some additional helper methods for the test container
export default ContainerExtensions.ExtendContainer(testContainer);