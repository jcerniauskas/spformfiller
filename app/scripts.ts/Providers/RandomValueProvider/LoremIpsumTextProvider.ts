import { Random } from "../../Utils/Random";

// this class returns a random sentence from a Lorem Ipsum text set using various constraints
export class LoremIpsumTextProvider {
    // a bunch of random Lorem Ipsum words
    private static readonly _loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at mauris id nisl malesuada tristique nec eu metus. Phasellus tristique lorem sed elit euismod, eu posuere mi luctus. In fringilla elit eu massa sodales, ut facilisis erat ornare. Fusce finibus euismod leo, a sodales mi ornare ut. Vivamus id viverra felis, et vehicula risus. Etiam cursus ante vitae enim congue, quis euismod dolor tempor. Maecenas eu arcu faucibus, venenatis ex eu, fermentum turpis. In hac habitasse platea dictumst. Mauris venenatis, est quis porta condimentum, lorem ex accumsan ante, sed lacinia libero est vel arcu. Donec nec mauris odio. Ut pretium at massa tincidunt consequat. Cras sed ante vitae enim cursus consequat eu at lacus. In vitae nibh varius, dictum libero a, pulvinar augue.`;
    // we'll split those words into an array of individual words
    private static readonly _loremIpsumValueArray = LoremIpsumTextProvider._loremIpsum.split(" ").map(word => word.toLowerCase());

    // returns a sentence consisting of a random number of words within specified constraints
    public static GetRandomSentence(minWords: number, maxWords: number): Promise<any> {
        // randomize number of words
        const numberOfWords = Random.RandomIntFromInterval(minWords, maxWords);
        const arrayOfWords = new Array<string>(numberOfWords).fill("");
        for (let i in arrayOfWords) { arrayOfWords[i] = Random.RandomChoice(LoremIpsumTextProvider._loremIpsumValueArray); }

        // capitalize first word's first letter
        arrayOfWords[0] = LoremIpsumTextProvider.CapitalizeFirstLetter(arrayOfWords[0]);

        return Promise.resolve(arrayOfWords.join(" "));
    }

    private static CapitalizeFirstLetter(stringToCapitalize: string): string {
        return stringToCapitalize.charAt(0).toUpperCase() + stringToCapitalize.slice(1);
    }
}