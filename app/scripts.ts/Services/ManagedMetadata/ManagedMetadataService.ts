import { injectable } from "inversify";
import { Term, IManagedMetadataService } from "./IManagedMetadataService";

interface TermFromAPI extends Term {
    AvailableForTagging: boolean;
}

interface TermPromises {
    [termsetId: string]: Promise<TermFromAPI[]>;
}

@injectable()
export default class ManagedMetadataService implements IManagedMetadataService {
    private LoadedTerms: TermPromises = { };

    private GetTerms(termsetId: string): Promise<TermFromAPI[]> {
        if (!this.LoadedTerms[termsetId]) {
            this.LoadedTerms[termsetId] = new Promise<TermFromAPI[]>((resolve, reject) => {
                ManagedMetadataService.ExecuteInContext((ctx) => {
                    const taxonomySession = SP.Taxonomy.TaxonomySession.getTaxonomySession(ctx);
                    const termStore = taxonomySession.getDefaultSiteCollectionTermStore();
                    const termSet = termStore.getTermSet(new SP.Guid(termsetId));
                    const terms = termSet.getAllTerms();

                    ctx.load(terms);
                    ctx.executeQueryAsync(
                        (sender, args) => {
                            const termArray: TermFromAPI[] = new Array<TermFromAPI>();
                            const termEnumerator = terms.getEnumerator();
                            while (termEnumerator.moveNext()) {
                                const currentTerm = termEnumerator.get_current();
                                termArray.push(<TermFromAPI>{
                                    Id: currentTerm.get_id().toString(),
                                    Name: currentTerm.get_name(),
                                    AvailableForTagging: currentTerm.get_isAvailableForTagging(),
                                });
                            }
                            resolve(termArray);
                        },
                        (sender, args) => { reject(args); }
                    );
                });
            });
        }

        return this.LoadedTerms[termsetId];
    }

    public async GetTermsAvailableForTagging(termsetId: string): Promise<Term[]> {
        const allTerms = await this.GetTerms(termsetId);
        return allTerms.filter(term => term.AvailableForTagging);
    }

    private static ExecuteInContext(contextAction: (context: SP.ClientContext) => void): void {
        SP.SOD.loadMultiple(["sp.js"], () => {
            // Make sure taxonomy library is registered
            SP.SOD.registerSod("sp.taxonomy.js", SP.Utilities.Utility.getLayoutsPageUrl("sp.taxonomy.js"));

            SP.SOD.loadMultiple(["sp.taxonomy.js"], () => {
                const ctx = SP.ClientContext.get_current();

                contextAction(ctx);
            });
        });
    }
}