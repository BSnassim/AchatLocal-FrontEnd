import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeBonDeCommandeComponent } from './liste-bon-de-commande.component';

describe('ListeBonDeCommandeComponent', () => {
  let component: ListeBonDeCommandeComponent;
  let fixture: ComponentFixture<ListeBonDeCommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeBonDeCommandeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeBonDeCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
