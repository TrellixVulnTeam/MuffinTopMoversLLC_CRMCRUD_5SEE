import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadEmployeesComponent } from './read-employees.component';

describe('ReadEmployeesComponent', () => {
  let component: ReadEmployeesComponent;
  let fixture: ComponentFixture<ReadEmployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadEmployeesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
