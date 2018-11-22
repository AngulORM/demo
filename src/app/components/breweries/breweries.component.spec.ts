import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import {BreweriesComponent} from './breweries.component';

describe('BreweriesComponent', () => {
  let component: BreweriesComponent;
  let fixture: ComponentFixture<BreweriesComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BreweriesComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BreweriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
