/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { IsActivePipe } from './is-active.pipe';

describe('Pipe: IsActivee', () => {
  it('create an instance', () => {
    const pipe = new IsActivePipe();
    expect(pipe).toBeTruthy();
  });

  it('pipe result', () => {
    const pipe = new IsActivePipe();
    const result = `<span class="badge badge-success"><i class="anticon anticon-check"></i></span>`;
    expect(pipe.transform(true))
      .toBe(result);
  });
});
