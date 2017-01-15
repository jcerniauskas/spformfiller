import Container from "./versionedInversify.config";
import { IFormFiller } from "./FormFiller/IFormFiller";

Container.Initialize();
let formFiller = Container.Current.get<IFormFiller>("IFormFiller");
formFiller.FillFormFields();