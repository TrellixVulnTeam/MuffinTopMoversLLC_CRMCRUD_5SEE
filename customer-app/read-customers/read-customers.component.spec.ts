import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadCustomersComponent } from './read-customers.component';

describe('ReadCustomersComponent', () => {
  let component: ReadCustomersComponent;
  let fixture: ComponentFixture<ReadCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadCustomersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
