import { TestBed } from '@angular/core/testing';

import { DemandeArticleService } from './demande-article.service';

describe('DemandeArticleService', () => {
  let service: DemandeArticleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemandeArticleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
