import SPVersion from "./SPVersion";

// this class determines the version of SharePoint we're currently running in
export default class VersionSelector {
    static GetCurrentVersion(): SPVersion {
        // only SP2013 is supported at the moment
        return SPVersion.SP2013;
    }
}