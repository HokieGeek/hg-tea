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

    ordinal_indicator(num: number): string {
        var o = "th";
        if (num < 4 || num > 20) {
            switch ((num % 10)) {
                case 1: o = "st"; break;
                case 2: o = "nd"; break;
                case 3: o = "rd"; break;
                default: o = "th"; break;
            }
        }
        return o;
    }

    transform(date: Date): string {
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        var ahora = new Date();
        var time = this.time_transform(date);

        if (ahora.getFullYear() == date.getFullYear()) { // this year
            var delta_ms = ahora.getTime() - date.getTime();
            if (delta_ms <= (3600 * 1000)) { // within the last hour
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
            } else if (ahora.getDate() == date.getDate()) { // on the same day
                if (delta_ms <= (7200 * 1000)) {
                    return "A couple of hours ago";
                } else if (delta_ms <= (21600 * 1000)) { // less than 6 hours ago
                    return "A few hours ago";
                } else if (date.getHours() < 12 && ahora.getDate() >= 12) {
                    return "This morning";
                } else {
                    return time; // Use this until I can come up with something obvious to mean ">8 hours ago"
                }
            } else if (ahora.getMonth() == date.getMonth()) { // this month
                if ((ahora.getDate()-date.getDate()) < 7) { // this week
                    if (delta_ms < (86400 * 1000)) { // in the last 24 hours
                        if (date.getHours() > 17) {
                            return "Last night at "+time;
                        } else {
                            return "Yesterday at "+time;
                        }
                    } else { // a few days ago
                        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                        return days[date.getDay()]+" at "+time;
                    }
                } else { // a few weeks ago
                    return "The "+date.getDate()+this.ordinal_indicator(date.getDate())+" at "+time;
                }
            } else { // a month or more ago
                return months[date.getMonth()]+" "+date.getDate()+" at "+time;
            }
        } else { // a year or more ago
            return months[date.getMonth()]+" "+date.getDate()+", "+date.getFullYear()+" at "+time;
        }
    }
}
