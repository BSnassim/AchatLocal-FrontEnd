import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDemandeAchatComponent } from './form-demande-achat.component';

describe('FormDemandeAchatComponent', () => {
  let component: FormDemandeAchatComponent;
  let fixture: ComponentFixture<FormDemandeAchatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDemandeAchatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDemandeAchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
