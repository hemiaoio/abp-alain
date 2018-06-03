import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isActive'
})
export class IsActivePipe implements PipeTransform {
  transform(isActive: boolean): string {
    if (isActive) {
      return `<span class="badge badge-success"><i class="anticon anticon-check"></i></span>`;
    } else {
      return `<span class="badge badge-error"><i class="anticon anticon-close"></i></span>`;
    }
  }
}
