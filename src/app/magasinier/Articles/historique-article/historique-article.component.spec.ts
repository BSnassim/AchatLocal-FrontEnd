import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueArticleComponent } from './historique-article.component';

describe('HistoriqueArticleComponent', () => {
  let component: HistoriqueArticleComponent;
  let fixture: ComponentFixture<HistoriqueArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriqueArticleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriqueArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
