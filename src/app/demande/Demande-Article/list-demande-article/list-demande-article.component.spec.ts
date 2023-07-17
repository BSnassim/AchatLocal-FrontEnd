import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDemandeArticleComponent } from './list-demande-article.component';

describe('ListDemandeArticleComponent', () => {
  let component: ListDemandeArticleComponent;
  let fixture: ComponentFixture<ListDemandeArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDemandeArticleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDemandeArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
