import { PipeTransform, Pipe } from '@angular/core';
import * as moment from 'moment'

@Pipe({
  name: 'PSDateTransform'
})
export class PSDateFormat implements PipeTransform {
  transform(value: string) {
    return moment.utc(value).local().fromNow();
  }

}
