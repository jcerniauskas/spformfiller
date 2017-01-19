export interface IValueProvider {
    GetRandomValue(): Promise<any>;
}