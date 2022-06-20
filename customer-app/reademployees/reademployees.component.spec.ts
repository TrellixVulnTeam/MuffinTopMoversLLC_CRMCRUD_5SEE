import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReademployeesComponent } from './reademployees.component';

describe('ReademployeesComponent', () => {
  let component: ReademployeesComponent;
  let fixture: ComponentFixture<ReademployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReademployeesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReademployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
