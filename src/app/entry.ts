/*
var TeaProductRatings = ["Value", "Leaf Aroma", "Brewed Aroma"];
var TeaFlushTypes = [ ["Spring", "Summer", "Fall", "Winter"],
                      ["1st Flush", "2nd Flush", "Monsoon Flush", "Autumn Flush"] ];
var TeaFlushTypes_Std = 0;
var TeaFlushTypes_Indian = 1;
var TeaPackagingTypes = ["Loose Leaf", "Bagged", "Tuo", "Beeng", "Brick", "Mushroom", "Square"];
*/
export enum TeaFixins {'Milk', 'Cream', 'Half & Half',
                'Sugar', 'Brown Sugar', 'Raw Sugar',
                'Honey', 'Vanilla Extract', 'Vanilla Bean',
                'Maple Cream', 'Maple Sugar', 'Chai Goop'}
export enum SteepingVessels {'French Press', 'Shipiao Yixing', 'Tea-zer Tumbler',
                      'Tea Stick', 'Mesh Spoon', 'Sauce Pan',
                      'Cup', 'Bowl', 'Gaiwan', 'Other', 'Aberdeen Steeper'}

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
