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
        public steepingvessel: number,
        public steeptemperature: number,
        public sessioninstance: string,
        public fixins: string,
    ) {}
}
