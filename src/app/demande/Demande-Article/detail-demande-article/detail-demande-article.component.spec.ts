import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDemandeArticleComponent } from './detail-demande-article.component';

describe('DetailDemandeArticleComponent', () => {
  let component: DetailDemandeArticleComponent;
  let fixture: ComponentFixture<DetailDemandeArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailDemandeArticleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailDemandeArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
