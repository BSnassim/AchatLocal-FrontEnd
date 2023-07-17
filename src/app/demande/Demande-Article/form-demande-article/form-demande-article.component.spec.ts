import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDemandeArticleComponent } from './form-demande-article.component';

describe('FormDemandeArticleComponent', () => {
  let component: FormDemandeArticleComponent;
  let fixture: ComponentFixture<FormDemandeArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDemandeArticleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDemandeArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
