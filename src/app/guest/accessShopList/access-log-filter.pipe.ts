import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'accessLogFilter'
})
export class AccessLogFilterPipe implements PipeTransform {

  transform(value: any, showExcluded: boolean): any {
    if (showExcluded) {
      return value;
    }
    const resultArray = [];
    for (const item of value) {
      if (item.exclude === false) {
        resultArray.push(item);
      }
    }
    return resultArray;
  }

}
