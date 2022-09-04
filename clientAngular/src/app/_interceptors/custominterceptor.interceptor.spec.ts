import { TestBed } from '@angular/core/testing';

import { CustominterceptorInterceptor } from './custominterceptor.interceptor';

describe('CustominterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      CustominterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: CustominterceptorInterceptor = TestBed.inject(CustominterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
