import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBonDeCommandeComponent } from './form-bon-de-commande.component';

describe('FormBonDeCommandeComponent', () => {
  let component: FormBonDeCommandeComponent;
  let fixture: ComponentFixture<FormBonDeCommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormBonDeCommandeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBonDeCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
