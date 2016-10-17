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
        switch ((num % 10)) {
            case 1: return "st"; break;
            case 2: return "nd"; break;
            case 3: return "rd"; break;
            default: return "th"; break;
        }
    }

    transform(date: Date): string {
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        var ahora = new Date();

        var time = this.time_transform(date);
        
        if (ahora.getFullYear() == date.getFullYear()) { // Happened this year
            

            // Determine the number of milliseconds
            var delta_ms = ahora.getTime() - date.getTime();
            if (delta_ms <= (3600 * 1000)) { // Happened within the last hour
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
            } else if (ahora.getDate() == date.getDate()) { // Happened on the same day
                if (delta_ms <= (7200 * 1000)) {
                    return "A couple of hours ago";
                } else if (delta_ms <= (21600 * 1000)) {
                    return "A few hours ago";
                } else if (date.getHours() < 12 && ahora.getDate() >= 12) {
                    return "This morning";
                } else {
                    return time;
                }
            } else if (ahora.getMonth() == date.getMonth()) { // Happend this month
                if (ahora.getDate()-date.getDate()) < 7) { // Happened this week
                    if (delta_ms < (86400 * 1000)) {
                        if (date.getHours() > 17) {
                            return "Last night at "+time;
                        } else {
                            return "Yesterday at "+time;
                        }
                    } else {
                        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                        return days[date.getDay()]+" at "+time;
                    }
                } else {
                    return "The "+date.getDate()+"<sup>"+this.ordinal_indicator(date.getDate())+"</sup> at "+time;
                }
            } else {
                return months[date.getMonth()]+" "+date.getDate()+" at "+time;
            }
        } else {
            return months[date.getMonth()]+" "+date.getDate()+", "+date.getFullYear()+" at "+time;
        }
    }
}
