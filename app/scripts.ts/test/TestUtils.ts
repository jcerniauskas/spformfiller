// a utility function class for tests
export class TestUtils {
    public static ReturnDelay<T>(variable: T): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            setTimeout(() => { resolve(variable); }, 500);
        });
    }
}