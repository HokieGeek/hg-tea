export class Entry {
    // public "timestamp": ??,
    // public "date": ??,
    // public "time": ??,
    // public "tea": ??,
    // public "rating": ??,
    // public "comments": ??,
    // public "pictures": ??,
    // public "steeptime": ??,
    // public "steepingvessel": ??,
    // public "steeptemperature": ??,
    // public "sessioninstance": ??,
    // public "fixins": ??,
    constructor(
        public teaId: number,
        public comments: string
    ) {}
}
