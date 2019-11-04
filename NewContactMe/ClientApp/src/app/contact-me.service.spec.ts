import { TestBed, inject } from '@angular/core/testing';

import { ContactMeService } from './contact-me.service';

describe('ContactMeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContactMeService]
    });
  });

  it('should be created', inject([ContactMeService], (service: ContactMeService) => {
    expect(service).toBeTruthy();
  }));
});
