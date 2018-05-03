export class Tea {
    private teaFlushTypes = {
                      'default': ['Spring', 'Summer', 'Fall', 'Winter'],
                      'indian' : ['1st Flush', '2nd Flush', 'Monsoon Flush', 'Autumn Flush']
                      };

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
        public ratings: string,
        public comments: string,
        public pictures: string[],
        public country: string,
        public leafgrade: string,
        public blendedteas: string,
        public blendratio: string,
        public size: string,
        public stocked: boolean,
        public aging: boolean,
        public packaging: string
    ) {}

    get flush() {
        if (this.country.toLowerCase() === 'india') {
            return this.teaFlushTypes['indian'][this.flush_idx];
        } else {
            return this.teaFlushTypes['default'][this.flush_idx];
        }
    }
}
