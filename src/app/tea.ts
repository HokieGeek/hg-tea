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

class JournalDbEntry {
    public comments: string;
    public timestamp: string;
    public date: string;
    public time: number;
    public rating: number;
    public pictures: string[];
    public steeptime: string;
    public steepingvessel_idx: number;
    public steeptemperature: number;
    public sessioninstance: string;
    public sessionclosed: boolean;
    public fixins_list: number[];

    constructor() { }
}

export class Entry {
    public teaId: number;

    constructor(public dbentry: JournalDbEntry) { }

    get comments(): string {
        return this.dbentry.comments;
    }

    get timestamp(): string {
        return this.dbentry.timestamp;
    }

    get date(): string {
        return this.dbentry.date;
    }

    get time(): number {
        return this.dbentry.time;
    }

    get rating(): number {
        return this.dbentry.rating;
    }

    get pictures(): string[] {
        if (this.dbentry.pictures == null) {
            return [];
        } else {
            return this.dbentry.pictures;
        }
    }

    get steeptime(): string {
        return this.dbentry.steeptime;
    }

    get steepingvessel_idx(): number {
        return this.dbentry.steepingvessel_idx;
    }

    get steeptemperature(): number {
        return this.dbentry.steeptemperature;
    }

    get sessioninstance(): string {
        return this.dbentry.sessioninstance;
    }

    get sessionclosed(): boolean {
        return this.dbentry.sessionclosed;
    }

    get fixins_list(): number[] {
        if (this.dbentry.fixins_list === null) {
            return [];
        } else {
            return this.dbentry.fixins_list;
        }
    }

    get steepingvessel(): string { return SteepingVessels[this.steepingvessel_idx]; }

    get fixins() {
        if (this.fixins_list.length > 0) {
            let fixins_str = '';
            for (const fixin of this.fixins_list.map(f => TeaFixins[f])) {
                fixins_str += ', ' + fixin;
            }
            fixins_str = fixins_str.replace(/^, /, '');
            if (this.fixins_list.length > 1) {
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
        if (time_str.length === 2) {
            datetime.setHours(0);
        } else {
            datetime.setHours(parseInt(time_str.substring(0, time_str.length - 2), 10));
        }
        datetime.setMinutes(parseInt(time_str.substring(time_str.length - 2), 10));
        return datetime;
    }
}

export class EntryBuilder {
    private dbentry: JournalDbEntry = new JournalDbEntry();
    private _teaid = -1;

    public from(e: Entry): EntryBuilder {
        this.dbentry = e.dbentry;
        return this;
    }

    public teaId(val: number): EntryBuilder {
        this._teaid = val;
        return this;
    }

    public comments(val: string): EntryBuilder {
        this.dbentry.comments = val;
        return this;
    }

    public timestamp(val: string): EntryBuilder {
        this.dbentry.timestamp = val;
        return this;
    }

    public date(val: string): EntryBuilder {
        this.dbentry.date = val;
        return this;
    }

    public time(val: number): EntryBuilder {
        this.dbentry.time = val;
        return this;
    }

    public rating(val: number): EntryBuilder {
        this.dbentry.rating = val;
        return this;
    }

    public pictures(val: string[]): EntryBuilder {
        this.dbentry.pictures = val;
        return this;
    }

    public steeptime(val: string): EntryBuilder {
        this.dbentry.steeptime = val;
        return this;
    }

    public steepingvessel_idx(val: number): EntryBuilder {
        this.dbentry.steepingvessel_idx = val;
        return this;
    }

    public steeptemperature(val: number): EntryBuilder {
        this.dbentry.steeptemperature = val;
        return this;
    }

    public sessioninstance(val: string): EntryBuilder {
        this.dbentry.sessioninstance = val;
        return this;
    }

    public sessionclosed(val: boolean): EntryBuilder {
        this.dbentry.sessionclosed = val;
        return this;
    }

    public fixins_list(val: number[]): EntryBuilder {
        this.dbentry.fixins_list = val;
        return this;
    }

    public build(): Entry {
        const e = new Entry(this.dbentry);
        e.teaId = this._teaid;
        return e;
    }
}

class TeaDbEntry {
    public id: number;
    public name: string;
    public timestamp: string;
    public date: string;
    public type: string;
    public region: string;
    public year: number;
    public flush_idx: number;
    public purchaselocation: string;
    public purchasedate: string;
    public purchaseprice: number;
    public comments: string;
    public pictures: string[];
    public country: string;
    public leafgrade: string;
    public blendedteas: string;
    public blendratio: string;
    public size: string;
    public stocked: boolean;
    public aging: boolean;
    public packaging_idx: number;
    public sample: boolean;
    public entries: JournalDbEntry[] = [];

    constructor() { }
}

export class Tea {
    private _latestEntry: Entry = null;

    constructor(public dbentry: TeaDbEntry) { }

    get id(): number {
        return this.dbentry.id;
    }

    get name(): string {
        return this.dbentry.name;
    }

    get timestamp(): string {
        return this.dbentry.timestamp;
    }

    get date(): string {
        return this.dbentry.date;
    }

    get type(): string {
        return this.dbentry.type;
    }

    get region(): string {
        return this.dbentry.region;
    }

    get year(): number {
        return this.dbentry.year;
    }

    get flush_idx(): number {
        return this.dbentry.flush_idx;
    }

    get purchaselocation(): string {
        return this.dbentry.purchaselocation;
    }

    get purchasedate(): string {
        return this.dbentry.purchasedate;
    }

    get purchaseprice(): number {
        return this.dbentry.purchaseprice;
    }

    get comments(): string {
        return this.dbentry.comments;
    }

    get pictures(): string[] {
        if (this.dbentry.pictures == null) {
            return [];
        } else {
            return this.dbentry.pictures;
        }
    }

    get country(): string {
        return this.dbentry.country;
    }

    get leafgrade(): string {
        return this.dbentry.leafgrade;
    }

    get blendedteas(): string {
        return this.dbentry.blendedteas;
    }

    get blendratio(): string {
        return this.dbentry.blendratio;
    }

    get size(): string {
        return this.dbentry.size;
    }

    get stocked(): boolean {
        return this.dbentry.stocked;
    }

    get aging(): boolean {
        return this.dbentry.aging;
    }

    get packaging_idx(): number {
        return this.dbentry.packaging_idx;
    }

    get sample(): boolean {
        return this.dbentry.sample;
    }

    get entries(): Entry[] {
        // console.log('entries', this.dbentry.entries);
        if (this.dbentry.entries != null) {
            return this.dbentry.entries.map(e => new Entry(e));
        } else {
            return [];
        }
    }

    addEntry(entry: Entry) {
        if (this._latestEntry == null || entry.datetime.getTime() > this._latestEntry.datetime.getTime()) {
            this._latestEntry = entry;
        }
        this.entries.push(entry);
    }

    get latestEntry() {
        if (this._latestEntry == null && this.entries.length > 0) {
            this._latestEntry = this.entries.reduce((latest, cur) => {
                    if (latest == null || cur.datetime.getTime() > latest.datetime.getTime()) {
                        latest = cur;
                    }
                    return latest;
                }, null);
        }
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
                                            .filter(e => e.steepingvessel !== 'French Press')
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

export class TeaBuilder {
    private dbentry: TeaDbEntry = new TeaDbEntry();

    public from(t: TeaDbEntry): TeaBuilder {
        this.dbentry = t;
        return this;
    }

    public id(val: number): TeaBuilder {
        this.dbentry.id = val;
        return this;
    }

    public name(val: string): TeaBuilder {
        this.dbentry.name = val;
        return this;
    }

    public timestamp(val: string): TeaBuilder {
        this.dbentry.timestamp = val;
        return this;
    }

    public date(val: string): TeaBuilder {
        this.dbentry.date = val;
        return this;
    }

    public type(val: string): TeaBuilder {
        this.dbentry.type = val;
        return this;
    }

    public region(val: string): TeaBuilder {
        this.dbentry.region = val;
        return this;
    }

    public year(val: number): TeaBuilder {
        this.dbentry.year = val;
        return this;
    }

    public flush_idx(val: number): TeaBuilder {
        this.dbentry.flush_idx = val;
        return this;
    }

    public purchaselocation(val: string): TeaBuilder {
        this.dbentry.purchaselocation = val;
        return this;
    }

    public purchasedate(val: string): TeaBuilder {
        this.dbentry.purchasedate = val;
        return this;
    }

    public purchaseprice(val: number): TeaBuilder {
        this.dbentry.purchaseprice = val;
        return this;
    }

    public comments(val: string): TeaBuilder {
        this.dbentry.comments = val;
        return this;
    }

    public pictures(val: string[]): TeaBuilder {
        this.dbentry.pictures = val;
        return this;
    }

    public country(val: string): TeaBuilder {
        this.dbentry.country = val;
        return this;
    }

    public leafgrade(val: string): TeaBuilder {
        this.dbentry.leafgrade = val;
        return this;
    }

    public blendedteas(val: string): TeaBuilder {
        this.dbentry.blendedteas = val;
        return this;
    }

    public blendratio(val: string): TeaBuilder {
        this.dbentry.blendratio = val;
        return this;
    }

    public size(val: string): TeaBuilder {
        this.dbentry.size = val;
        return this;
    }

    public stocked(val: boolean): TeaBuilder {
        this.dbentry.stocked = val;
        return this;
    }

    public aging(val: boolean): TeaBuilder {
        this.dbentry.aging = val;
        return this;
    }

    public packaging_idx(val: number): TeaBuilder {
        this.dbentry.packaging_idx = val;
        return this;
    }

    public sample(val: boolean): TeaBuilder {
        this.dbentry.sample = val;
        return this;
    }

    public build(): Tea {
        return new Tea(this.dbentry);
    }
}
