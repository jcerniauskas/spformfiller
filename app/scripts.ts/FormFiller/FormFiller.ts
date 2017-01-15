import { IFormFiller } from "./IFormFiller";
import { injectable, inject } from "inversify";

@injectable()
export default class FormFiller implements IFormFiller {
    public async FillFormFields(): Promise<void> {

    }
}