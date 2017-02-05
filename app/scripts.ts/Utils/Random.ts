// provides some convenient utility methods for randomizing some values
export default class Random {
    public static RandomIntFromInterval(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    public static RandomChoice<T>(array: T[]): T {
        if(!array) {
            throw new Error("Array is undefined");
        }

        if (array.length < 1) {
            throw new Error("Array is empty");
        }

        const randIndex = Random.RandomIntFromInterval(0, array.length - 1);
        return array[randIndex];
    };

    public static RandomDate(start: Date, end: Date) {
        if (end.getTime() < start.getTime()) {
            throw new Error("End date is greater than start date");
        }
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }
}