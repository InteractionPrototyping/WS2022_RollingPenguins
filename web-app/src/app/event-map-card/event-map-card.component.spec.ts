import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventMapCardComponent } from './event-map-card.component';

describe('EventMapCardComponent', () => {
  let component: EventMapCardComponent;
  let fixture: ComponentFixture<EventMapCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventMapCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventMapCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
