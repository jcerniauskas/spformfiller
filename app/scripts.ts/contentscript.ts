import { IAlertService, TYPES } from "./IAlertService";
import kernel from "./inversify.config";

let service = kernel.get<IAlertService>(TYPES.IAlertService);
service.ShowAlert("Custom");