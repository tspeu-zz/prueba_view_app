import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { VehicleformComponent } from './vehicleform.component';



describe('VehicleformComponent', () => {
  let component: VehicleformComponent;
  let fixture: ComponentFixture<VehicleformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
