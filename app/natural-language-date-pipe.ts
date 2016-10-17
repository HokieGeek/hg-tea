import { Pipe, PipeTransform } from '@angular/core'

@Pipe({ name: 'naturalDate'})
export class NaturalLanguageDatePipe implements PipeTransform {
    transform(date: Date): string {

        // "Natural"
        // today => "X minutes / hours ago"
        //          "this morning"
        // yesterday => "Yesterday"
        // this week => the week day
        // last week => last week day
        // this month => the Day'th
        // this year => Month Day
        // else => Month Day, Year

        var ahora = new Date();

        // Determine the number of seconds
        var delta_ms = ahora.getTime() - date.getTime();

        if (delta_ms <= (3600 * 1000) {
            if (delta_ms < (30 * 1000)) {
                return "Just now";
            } else if (delta_ms < (900 * 1000)) {
                return "A few minutes ago";
            } else if (delta_ms <= (1800 * 1000)) {
                return "Half an hour ago";
            } else if (delta_ms < (3300 * 1000)) {
                return "Over half an hour ago";
            } else {
                return "An hour ago";
            }
        } else if (ahora.getYear() == date.getYear()) {
            var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

            var time = date.getHours()+":"+date.getMinutes();

            if (ahora.getDate() == date.getDate()) {
                return time;
            } else if (ahora.getMonth() == date.getMonth() && (ahora.getDate()-date.getDate()) < 7) {
                return days[date.getDay()]+" @ "+time;
            } else {
                return months[date.getMonth()]+" "+date.getDate()+" @ "+time;
            }
        } else {
            return date.toLocaleString();
        }
    }
}
