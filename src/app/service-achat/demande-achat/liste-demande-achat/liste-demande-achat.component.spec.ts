import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDemandeAchatComponent } from './liste-demande-achat.component';

describe('ListeDemandeAchatComponent', () => {
  let component: ListeDemandeAchatComponent;
  let fixture: ComponentFixture<ListeDemandeAchatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeDemandeAchatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeDemandeAchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
