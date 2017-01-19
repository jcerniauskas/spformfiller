import Container from "../versionedInversify.config";
import { IFormFiller } from "../FormFiller/IFormFiller";

// this is the "execution root" of the form filler. It initializes the IFormFiller component and runs it.
export default class InjectionRoot {
    private static _formFiller: IFormFiller;

    public static Initialize(): void {
        Container.Initialize();
        InjectionRoot._formFiller = Container.Current.get<IFormFiller>("IFormFiller");
    }

    // this can be run multiple times to re-generate the field values
    public static FillFormFields(): void {
        if (InjectionRoot._formFiller === undefined) {
            InjectionRoot.Initialize();
        }

        InjectionRoot._formFiller.FillFormFields();
    }
}