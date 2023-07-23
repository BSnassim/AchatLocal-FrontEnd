import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBonDeSortieComponent } from './list-bon-de-sortie.component';

describe('ListBonDeSortieComponent', () => {
  let component: ListBonDeSortieComponent;
  let fixture: ComponentFixture<ListBonDeSortieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListBonDeSortieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBonDeSortieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
