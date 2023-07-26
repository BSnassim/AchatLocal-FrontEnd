import { TestBed } from '@angular/core/testing';

import { HistoriqueArticleService } from './historique-article.service';

describe('HistoriqueArticleService', () => {
  let service: HistoriqueArticleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoriqueArticleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
