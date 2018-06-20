enum teaPackagingTypes {'Loose Leaf', 'Bagged', 'Tuo', 'Beeng', 'Brick', 'Mushroom', 'Square'}
enum teaFlushTypesDefault {'Spring', 'Summer', 'Fall', 'Winter'}
enum teaFlushTypesIndian {'1st Flush', '2nd Flush', 'Monsoon Flush', 'Autumn Flush'}

export enum TeaFixins {'Milk', 'Cream', 'Half & Half',
                'Sugar', 'Brown Sugar', 'Raw Sugar',
                'Honey', 'Vanilla Extract', 'Vanilla Bean',
                'Maple Cream', 'Maple Sugar', 'Chai Goop', 'Ice'}
export enum SteepingVessels {'Other', 'French Press', 'Shipiao Yixing', 'Tea-zer Tumbler',
                      'Tea Stick', 'Mesh Spoon', 'Sauce Pan',
                      'Cup', 'Bowl', 'Chrysanthemum Gaiwan', 'Aberdeen Steeper', 'Celadon Gaiwan'}

export class Entry {
    constructor(
        public teaId: number,
        public comments: string,
        public timestamp: string,
        public date: string,
        public time: number,
        public rating: number,
        public pictures: string,
        public steeptime: string,
        public steepingvessel_idx: number,
        public steeptemperature: number,
        public sessioninstance: string,
        public sessionclosed: boolean,
        public fixins_list: string,
    ) { }

    get steepingvessel() { return SteepingVessels[this.steepingvessel_idx]; }

    get fixins() {
        if (this.fixins_list.length > 0) {
            let fixins_str = '';
            for (const fixin of this.fixins_list.split(';').map(f => TeaFixins[f])) {
                fixins_str += ', ' + fixin;
            }
            fixins_str = fixins_str.replace(/^, /, '');
            if (this.fixins_list.split(';').length > 1) {
                return fixins_str.substring(0, fixins_str.lastIndexOf(',')) + ' and'
                    + fixins_str.substring(fixins_str.lastIndexOf(',') + 1);
            } else {
                return fixins_str;
            }
        }
        return '';
    }

    get datetime(): Date {
        const datetime = new Date(this.date);
        const time_str = this.time.toString();
        datetime.setHours(parseInt(time_str.substring(0, time_str.length - 2), 10));
        datetime.setMinutes(parseInt(time_str.substring(time_str.length - 2), 10));
        return datetime;
    }
}

export class Tea {
    public entries: Entry[] = [];

    private _latestEntry: Entry = null;

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
        public purchaseprice: number,
        public comments: string,
        public pictures: string[],
        public country: string,
        public leafgrade: string,
        public blendedteas: string,
        public blendratio: string,
        public size: string,
        public stocked: boolean,
        public aging: boolean,
        public packaging_idx: number,
        public sample: boolean
    ) {}

    addEntry(entry: Entry) {
        if (this._latestEntry == null || entry.datetime.getTime() > this._latestEntry.datetime.getTime()) {
            this._latestEntry = entry;
        }
        this.entries.push(entry);
    }

    get latestEntry() {
        return this._latestEntry;
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

    get ratingAvg(): number {
        let total = 0;
        for (const entry of this.entries) {
            total += +entry.rating;
        }
        return Math.floor(total / this.entries.length);
    }

    get ratingMedian(): number {
        const ratings: number[] = [];
        for (const entry of this.entries) {
            ratings.push(+entry.rating);
        }

        return ratings.sort()[Math.floor(this.entries.length / 2)];
    }

    private countFields(m: any[]): any[] {
        const counted: Map<any, number> = m.reduce((prev, cur) => {
                                                prev.set(cur, (prev.get(cur) || 0) + 1);
                                                return prev;
                                              }, new Map<any, number>());
        return Array.from(counted.entries()).sort((a, b) => b[1] - a[1]).map(v => v[0]);
    }

    get vessels(): string[] {
        let _vessels: string[] = [];
        if (this.entries.length > 0) {
            _vessels = this.countFields(this.entries
                                            .filter(e => e.steepingvessel_idx != SteepingVessels['French Press'])
                                            .map(e => e.steepingvessel));
        }
        return _vessels;
    }

    get temperaturesInF(): number[] {
        let temps: number[] = [];
        if (this.entries.length > 0) {
            temps = this.countFields(this.entries.map(e => e.steeptemperature));
        }
        return temps;
    }
}
