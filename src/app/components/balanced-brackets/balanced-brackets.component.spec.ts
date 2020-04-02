import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalancedBracketsComponent } from './balanced-brackets.component';

describe('BalancedBracketsComponent', () => {
  let component: BalancedBracketsComponent;
  let fixture: ComponentFixture<BalancedBracketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalancedBracketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalancedBracketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
