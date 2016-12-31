export interface IAlertService {
    GetDefaultMessage(): string;
    ShowAlert(message?: string): void;
}

let TYPES = {
    IAlertService: Symbol("IAlertService")
};

export { TYPES }