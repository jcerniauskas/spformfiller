export default class AlertService {
    static GetDefaultMessage() { return "Default"; }

    static ShowAlert(message?: string) {
        if (!message) message = this.GetDefaultMessage();
        alert(message);
    }
}