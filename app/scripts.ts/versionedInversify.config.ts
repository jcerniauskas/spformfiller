import { SPVersion } from "./Versions/SPVersion";
import { ContainersForVersion } from "./inversify.config";
import { VersionSelector } from "./Versions/VersionSelector";
import { Container } from "inversify";

// this class returns an inversify container for the current version of SharePoint we're running against
export default class VersionedContainer {
    public static Current: Container;
    public static CurrentVersion: SPVersion;

    public static Initialize(): void {
        this.CurrentVersion = VersionSelector.GetCurrentVersion();
        this.Current = ContainersForVersion.GetContainerForVersion(this.CurrentVersion);
    }
}