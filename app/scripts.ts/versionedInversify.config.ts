import SPVersion from "./Versions/SPVersion";
import ContainersFromVersion from "./inversify.config";
import VersionSelector from "./Versions/VersionSelector";
import { Container } from "inversify";

export default class VersionedContainer {
    public static Current: Container;
    public static CurrentVersion: SPVersion;

    public static Initialize(): void {
        this.CurrentVersion = VersionSelector.GetCurrentVersion();
        this.Current = ContainersFromVersion.GetContainerForVersion(this.CurrentVersion);
    }
}