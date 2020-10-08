import { TestBed } from '@angular/core/testing';

import { SignInModalService } from './sign-in-modal.service';

describe('SignInModalService', () => {
  let service: SignInModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignInModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
