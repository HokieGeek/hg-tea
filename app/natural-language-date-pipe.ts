import { Pipe, PipeTransform } from '@angular/core'

@Pipe({ name: 'naturalDate'})
export class NaturalLanguageDatePipe implements PipeTransform {
    time_transform(date: Date): string {
        var mer = "a";
        var h = date.getHours();
        if (h > 12) {
            mer = "p";
            h -= 12;
        } else if (h == 0) {
            h = 12;
        }

        var m = date.getMinutes();
        var mpad = "";
        if (m < 10) {
            mpad = "0";
        }

        return h+":"+mpad+m+mer;
    }

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

        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        var ahora = new Date();

        // Determine the number of seconds
        var delta_ms = ahora.getTime() - date.getTime();

        var time = this.time_transform(date);

        if (delta_ms <= (3600 * 1000)) {
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
        } else if (ahora.getFullYear() == date.getFullYear()) {
            var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

            if (ahora.getDate() == date.getDate()) {
                // TODO: If it is currently afternoon, then do "This morning"?
                return time;
            } else if (ahora.getMonth() == date.getMonth() && (ahora.getDate()-date.getDate()) < 7) {
                return days[date.getDay()]+" "+time;
            } else {
                return months[date.getMonth()]+" "+date.getDate()+" "+time;
            }
        } else {
            return months[date.getMonth()]+" "+date.getDate()+", "+date.getFullYear()+" "+time;
            // return date.toLocaleString();
        }
    }
}
