import { IValueProvider } from "./IValueProvider";
import { injectable } from "inversify";

@injectable()
export default class LoremIpsumTextProvider implements IValueProvider {
    // a bunch of random Lorem Ipsum words
    static readonly _loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at mauris id nisl malesuada tristique nec eu metus. Phasellus tristique lorem sed elit euismod, eu posuere mi luctus. In fringilla elit eu massa sodales, ut facilisis erat ornare. Fusce finibus euismod leo, a sodales mi ornare ut. Vivamus id viverra felis, et vehicula risus. Etiam cursus ante vitae enim congue, quis euismod dolor tempor. Maecenas eu arcu faucibus, venenatis ex eu, fermentum turpis. In hac habitasse platea dictumst. Mauris venenatis, est quis porta condimentum, lorem ex accumsan ante, sed lacinia libero est vel arcu. Donec nec mauris odio. Ut pretium at massa tincidunt consequat. Cras sed ante vitae enim cursus consequat eu at lacus. In vitae nibh varius, dictum libero a, pulvinar augue.`;
    // we'll split those words into an array of individual words
    static readonly _loremIpsumValueArray = LoremIpsumTextProvider._loremIpsum.split(" ").map(word => word.toLowerCase());

    public GetRandomValue(): Promise<any> {
        // randomize 3 to 5 words
        let numberOfWords = LoremIpsumTextProvider.RandomIntFromInterval(3, 5);
        let arrayOfWords = new Array<string>(numberOfWords).fill("");
        for (let i in arrayOfWords) { arrayOfWords[i] = LoremIpsumTextProvider.RandomChoice(LoremIpsumTextProvider._loremIpsumValueArray); }

        // capitalize first word's first letter
        arrayOfWords[0] = LoremIpsumTextProvider.CapitalizeFirstLetter(arrayOfWords[0]);

        return Promise.resolve(arrayOfWords.join(" "));
    }

    static RandomIntFromInterval(min: number, max: number)
    {
        return Math.floor(Math.random()*(max - min + 1) + min);
    }

    static RandomChoice<T>(array: T[]): T
    {
        let randIndex = LoremIpsumTextProvider.RandomIntFromInterval(0, array.length - 1);
        return array[randIndex];
    };

    static CapitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}