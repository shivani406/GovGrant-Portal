import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http'; // 1. Import this
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { GrantService } from './grant';

describe('GrantService', () => {
  let service: GrantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrantService);
    providers: [
        GrantService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(GrantService);

    
    it('should be created', () => {
      expect(service).toBeTruthy();
    });


  });
