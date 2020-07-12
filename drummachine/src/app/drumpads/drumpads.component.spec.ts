import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrumpadsComponent } from './drumpads.component';

describe('DrumpadsComponent', () => {
  let component: DrumpadsComponent;
  let fixture: ComponentFixture<DrumpadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrumpadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrumpadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
