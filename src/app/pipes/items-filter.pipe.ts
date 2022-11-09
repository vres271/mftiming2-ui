import { Observable } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'itemsFilter'
})
export class ItemsFilterPipe implements PipeTransform {

  transform(items: any[], criterion: any):any[] {
    if(criterion) { 
      return items.filter(item=>{
        for(let key in criterion) {
          if(item[key] !== criterion[key]) return false
        }
        return true
      })
    }
    return items;
  }

}
