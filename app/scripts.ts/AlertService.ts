import { injectable } from "inversify";
import { TYPES, IAlertService } from "./IAlertService";

@injectable()
export default class AlertService implements IAlertService {
    GetDefaultMessage() { return "Default"; }

    ShowAlert(message?: string) {
        if (!message) message = this.GetDefaultMessage();
        alert(message);
    }
}