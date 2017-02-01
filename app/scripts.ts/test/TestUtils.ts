export default class TestUtils {
    public static ReturnDelay(variable: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            setTimeout(() => { resolve(variable); }, 500);
        });
    }
}