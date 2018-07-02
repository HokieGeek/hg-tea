import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'steeptime'
})
export class SteeptimePipe implements PipeTransform {
    transform(steeptime: number): string {
        if (steeptime >= 60) {
            const min = Math.floor(steeptime / 60);
            const sec = steeptime - (min * 60);
            let str = min + 'm';
            if (sec > 0) {
                str += ' ' + sec + 's';
            }
            return str;
        } else {
            return steeptime + 's';
        }
    }
}
