import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'enumValues'
})
export class EnumValuesPipe implements PipeTransform {
    // transform(data: Object) {
    transform(value: any, args?: any): any {
        const keys = Object.keys(value);
        return keys.slice(keys.length / 2);
    }
}
