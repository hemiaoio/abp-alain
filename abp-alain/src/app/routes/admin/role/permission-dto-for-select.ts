import { PermissionDto } from '@shared/service-proxies/service-proxies';

export class PermissionDtoForSelect extends PermissionDto {
  checked: boolean;
  constructor(obj: any) {
    super(obj);
    this.checked = obj['checked'];
  }
}
