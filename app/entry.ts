/*
var TeaProductRatings = ["Value", "Leaf Aroma", "Brewed Aroma"];
var TeaFlushTypes = [ ["Spring", "Summer", "Fall", "Winter"],
                      ["1st Flush", "2nd Flush", "Monsoon Flush", "Autumn Flush"] ];                                                                                                                   kar TeaFlushTypes_Std = 0;
var TeaFlushTypes_Indian = 1;
var TeaPackagingTypes = ["Loose Leaf", "Bagged", "Tuo", "Beeng", "Brick", "Mushroom", "Square"];
*/
enum TeaFixins {"Milk", "Cream", "Half & Half",
                "Sugar", "Brown Sugar", "Raw Sugar",
                "Honey", "Vanilla Extract", "Vanilla Bean",
                "Maple Cream", "Maple Sugar"};
enum SteepingVessels {"French Press", "Shipiao Yixing", "Tea-zer Tumbler",
                      "Tea Stick", "Mesh Spoon", "Sauce Pan",
                      Cup, Bowl, Gaiwan, Other};

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
        private steepingvessel_idx: number,
        public steeptemperature: number,
        public sessioninstance: string,
        private fixins_list: string,
    ) { }

    get steepingvessel() { return SteepingVessels[this.steepingvessel_idx]; }
    get fixins() {
        if (this.fixins_list.length > 0) {
            return this.fixins_list.split(";").map(f => TeaFixins[f]);
        }
        return [];
        // return this.fixins_list.split(";").map((f: string) => TeaFixins[f]);
        // fixins_str;
        // for (let f of this.fixins_list.split(";")) {
        //     // console.log(f)
        //     fixins_str += f + ","
        // }
        // console.log(fixins_str);
        // // return fixins_str
        // return this.fixins_list;
    }
}
