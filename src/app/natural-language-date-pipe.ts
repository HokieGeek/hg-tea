import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'naturalDate'})
export class NaturalLanguageDatePipe implements PipeTransform {
    day_of_year(date: Date): number {
        const start = new Date(date.getFullYear(), 0, 0);
        const diff = (date.getTime() - start.getTime()) + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000);
        return Math.floor(diff / (1000 * 60 * 60 * 24));
    }

    time_transform(date: Date): string {
        let mer = 'a';
        let h = date.getHours();
        if (h > 12) {
            mer = 'p';
            h -= 12;
        } else if (h === 0) {
            h = 12;
        }

        const m = date.getMinutes();
        let mpad = '';
        if (m < 10) {
            mpad = '0';
        }

        return h + ':' + mpad + m + mer;
    }

    ordinal_indicator(num: number): string {
        let o = 'th';
        if (num < 4 || num > 20) {
            switch ((num % 10)) {
                case 1: o = 'st'; break;
                case 2: o = 'nd'; break;
                case 3: o = 'rd'; break;
                default: o = 'th'; break;
            }
        }
        return o;
    }

    transform(date: Date, ahora = new Date()): string {
        // console.log('ahora> ', ahora);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        const time = this.time_transform(date);

        if (ahora.getFullYear() === date.getFullYear()) { // this year
            const delta_ms = ahora.getTime() - date.getTime();
            const delta_days = this.day_of_year(ahora) - this.day_of_year(date);

            if (delta_ms <= (3600 * 1000)) { // within the last hour
                if (delta_ms < (30 * 1000)) {
                    return 'Just now';
                } else if (delta_ms < (900 * 1000)) {
                    return 'A few minutes ago';
                } else if (delta_ms <= (1800 * 1000)) {
                    return 'Half an hour ago';
                } else if (delta_ms < (3300 * 1000)) {
                    return 'Over half an hour ago';
                } else {
                    return 'An hour ago';
                }
            } else if ((ahora.getDate() === date.getDate()) && (ahora.getMonth() === date.getMonth())) { // on the same day
                if (delta_ms < (7200 * 1000)) { // < 1h 20m
                    return 'A couple of hours ago';
                } else if (delta_ms < (21600 * 1000)) { // less than 6 hours ago
                    return 'A few hours ago';
                } else if (delta_ms < (28800 * 1000)) { // less than 8 hours ago
                    if (date.getHours() < 12) {
                        return 'This morning';
                    } else if (date.getHours() < 17) {
                        return 'This afternoon';
                    } else {
                        return 'This evening';
                    }
                } else if (delta_ms < (43200 * 1000)) { // around 12 hours ago
                    if (date.getHours() < 12) {
                        return 'This morning at ' + date.getHours();
                    } else if (date.getHours() === 12) {
                        return 'Around noon';
                    } else {
                        return 'This afternoon at ' + (date.getHours() - 12);
                    }
                } else {
                    return time; // Use this until I can come up with something obvious to mean ">12hours ago"
                }
            } else if (delta_days < 7) { // this week
                if (delta_ms < (86400 * 1000)) { // in the last 24 hours
                    if (date.getHours() > 17) {
                        return 'Last night at ' + time;
                    } else {
                        return 'Yesterday at ' + time;
                    }
                } else { // a few days ago
                    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                    return days[date.getDay()] + ' at ' + time;
                }
            } else if (delta_days < 22) { // within 3 weeks
                return 'The ' + date.getDate() + this.ordinal_indicator(date.getDate()) + ' at ' + time;
            } else { // a month or more ago
                return months[date.getMonth()] + ' ' + date.getDate() + ' at ' + time;
            }
        } else { // a year or more ago
            return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear() + ' at ' + time;
        }
    }
}
