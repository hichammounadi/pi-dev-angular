import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulletinTroisComponent } from './bulletin-trois.component';

describe('BulletinTroisComponent', () => {
  let component: BulletinTroisComponent;
  let fixture: ComponentFixture<BulletinTroisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulletinTroisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulletinTroisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
