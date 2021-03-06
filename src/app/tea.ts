import * as moment from 'moment';

// enum TeaPackagingTypes {'Loose Leaf', 'Bagged', 'Tuo', 'Beeng', 'Brick', 'Mushroom', 'Square'}
// enum teaFlushTypesDefault {'Spring', 'Summer', 'Fall', 'Winter'}
// enum teaFlushTypesIndian {'1st Flush', '2nd Flush', 'Monsoon Flush', 'Autumn Flush'}

export enum TeaFixins {'Milk', 'Cream', 'Half & Half',
                'Sugar', 'Brown Sugar', 'Raw Sugar',
                'Honey', 'Vanilla Extract', 'Vanilla Bean',
                'Maple Cream', 'Maple Sugar', 'Chai Goop', 'Ice'}
export enum SteepingVessels {'Other', 'French Press',
        'Shipiao Yixing', // 220cc
        'Tea-zer Tumbler', 'Tea Stick', 'Mesh Spoon', 'Sauce Pan', 'Cup', 'Bowl',
        'Chrysanthemum Gaiwan', // 180cc
        'Aberdeen Steeper',
        'Celadon Gaiwan', // 180cc
        'Yixing Gaiwan', // 150cc
}

// import { SteeptimePipe } from './steeptime.pipe';

class JournalDbEntry {
    public comments: string;
    public timestamp: string;
    public datetime: Date;
    public rating: number;
    public pictures: string[] = [];
    public steeptime: number;
    public steepingvessel_idx: number;
    public steeptemperature: number;
    public sessioninstance: string;
    public sessionclosed: boolean;
    public fixins: string[] = [];

    constructor() { }
}

export class Entry {
    public teaId: number;

    constructor(public dbentry: JournalDbEntry) {
        this.dbentry.datetime = moment(this.dbentry.datetime).toDate();
    }

    get comments(): string {
        return this.dbentry.comments;
    }

    get timestamp(): string {
        return this.dbentry.timestamp;
    }

    get date(): string {
        return moment(this.dbentry.datetime).format('M/D/YYYY');
    }

    get time(): string {
        return moment(this.dbentry.datetime).format('HHmm');
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

    get steeptime(): number {
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

    get steepingvessel(): string { return SteepingVessels[this.steepingvessel_idx]; }

    get fixins(): string[] {
        if (this.dbentry.fixins == null) {
            return [];
        }
        return this.dbentry.fixins;
    }

    get datetime(): Date {
        return this.dbentry.datetime;
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

    public datetime(val: Date): EntryBuilder {
        this.dbentry.datetime = val;
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

    public steeptime(val: number): EntryBuilder {
        // this.dbentry.steeptime = new SteeptimePipe().transform(val);
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

    public fixins(val: string[]): EntryBuilder {
        this.dbentry.fixins = val;
        return this;
    }

    public build(): Entry {
        const e = new Entry(this.dbentry);
        e.teaId = this._teaid;
        return e;
    }
}

export class TeaDbEntry {
    public id: number;
    public name: string;
    public timestamp: string;
    public date: Date;
    public type: string;
    public region: string;
    public year: number;
    public flush: string;
    public purchaselocation: string;
    public purchasedate: Date;
    public purchaseprice: number;
    public comments: string;
    public pictures: string[];
    public country: string;
    public leafgrade: string;
    public blendedteas: string;
    public blendratio: string;
    public size: number;
    public stocked = false;
    public aging = false;
    public packaging: string;
    public sample = false;
    public entries: JournalDbEntry[] = [];

    constructor() { }
}

export class Tea {
    private _latestEntry: Entry = null;
    private _entries: Entry[] = null;
    private _entriesIdToIdx: Map<number, number> = new Map<number, number>();
    private _pricePerCup = -1;

    constructor(public dbentry: TeaDbEntry) {
        if (this.dbentry.entries == null) {
            this._entries = [];
        }
    }

    get id(): number {
        return this.dbentry.id;
    }

    get name(): string {
        return this.dbentry.name;
    }

    get timestamp(): string {
        return this.dbentry.timestamp;
    }

    get date(): Date {
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

    get flush(): string {
        return this.dbentry.flush;
    }

    get purchaselocation(): string {
        return this.dbentry.purchaselocation;
    }

    get purchasedate(): Date {
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

    get size(): number {
        return this.dbentry.size;
    }

    get stocked(): boolean {
        return this.dbentry.stocked;
    }

    get aging(): boolean {
        return this.dbentry.aging;
    }

    get sample(): boolean {
        return this.dbentry.sample;
    }

    get entries(): Entry[] {
        if (this.dbentry.entries != null && this._entries == null) {
            this._entries = this.dbentry.entries.map(e => new Entry(e));
        }
        // console.log('entries', this._entries.length);
        return this._entries;
    }

    entry(id: Date): Entry {
        if (this._entriesIdToIdx.size === 0 && this.entries.length > 0) {
            this.entries.forEach((v, i) => {
                this._entriesIdToIdx.set(+v.datetime.getMilliseconds(), +i);
            });
        }

        const id_ms = id.getMilliseconds();

        if (!this._entriesIdToIdx.has(id_ms)) {
            return null;
        }

        return this.entries[this._entriesIdToIdx.get(id_ms)];
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

    get packaging() {
        return this.dbentry.packaging;
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

    get pricePerCup(): number {
        if (this._pricePerCup === -1 && this.entries.length > 0 && this.purchaseprice > 0) {
            // TODO: Would be this should be smarter...
            this._pricePerCup = this.purchaseprice / this.entries.length;
        }
        return this._pricePerCup;
    }
}

export class TeaBuilder {
    private dbentry: TeaDbEntry = new TeaDbEntry();

    public from(t: Tea): TeaBuilder {
        this.dbentry = t.dbentry;
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

    public date(val: Date): TeaBuilder {
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

    public flush(val: string): TeaBuilder {
        this.dbentry.flush = val;
        return this;
    }

    public purchaselocation(val: string): TeaBuilder {
        this.dbentry.purchaselocation = val;
        return this;
    }

    public purchasedate(val: Date): TeaBuilder {
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

    public size(val: number): TeaBuilder {
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

    public packaging(val: string): TeaBuilder {
        this.dbentry.packaging = val;
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
