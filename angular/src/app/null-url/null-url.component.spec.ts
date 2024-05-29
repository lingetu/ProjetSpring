import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NullUrlComponent } from './null-url.component';

describe('NullUrlComponent', () => {
  let component: NullUrlComponent;
  let fixture: ComponentFixture<NullUrlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NullUrlComponent]
    });
    fixture = TestBed.createComponent(NullUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
