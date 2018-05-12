import { Entry } from './entry';

enum teaPackagingTypes {'Loose Leaf', 'Bagged', 'Tuo', 'Beeng', 'Brick', 'Mushroom', 'Square'}
enum teaFlushTypesDefault {'Spring', 'Summer', 'Fall', 'Winter'}
enum teaFlushTypesIndian {'1st Flush', '2nd Flush', 'Monsoon Flush', 'Autumn Flush'}

export class Tea {
    public entries: Entry[] = [];

    constructor(
        public id: number,
        public name: string,
        public timestamp: string,
        public date: string,
        public type: string,
        public region: string,
        public year: number,
        public flush_idx: number,
        public purchaselocation: string,
        public purchasedate: string,
        public purchaseprice: string,
        public comments: string,
        public pictures: string[],
        public country: string,
        public leafgrade: string,
        public blendedteas: string,
        public blendratio: string,
        public size: string,
        public stocked: boolean,
        public aging: boolean,
        public packaging_idx: number
    ) {}

    addEntry(entry: Entry) {
        this.entries.push(entry);
    }

    get flush() {
        if (this.country.toLowerCase() === 'india') {
            return teaFlushTypesIndian[this.flush_idx - 1];
        } else {
            return teaFlushTypesDefault[this.flush_idx - 1];
        }
    }

    get packaging() {
        return teaPackagingTypes[this.packaging_idx - 1];
    }
}
