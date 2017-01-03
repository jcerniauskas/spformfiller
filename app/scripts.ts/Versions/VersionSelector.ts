import SPVersion from "./SPVersion";

export default class VersionSelector {
    static GetCurrentVersion(): SPVersion {
        return SPVersion.SP2013;
    }
}