import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { injectSpy } from 'angular-unit-test-helper';
import { of } from 'rxjs';

import { WeatherService } from '../weather/weather.service';
import { fakeWeather } from '../weather/weather.service.fake';
import { CurrentWeatherComponent } from './current-weather.component';

describe('CurrentWeatherComponent', () => {
  let component: CurrentWeatherComponent;
  let fixture: ComponentFixture<CurrentWeatherComponent>;
  let weatherServiceMock: jasmine.SpyObj<WeatherService>;

  beforeEach(async () => {
    const weatherServiceSpy = jasmine.createSpyObj('WeatherService', [
      'getCurrentWeather',
    ]);

    TestBed.configureTestingModule({
      declarations: [CurrentWeatherComponent],
      providers: [{ provide: WeatherService, useValue: weatherServiceSpy }],
    }).compileComponents();
    weatherServiceMock = injectSpy(WeatherService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentWeatherComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    // Arrange
    weatherServiceMock.getCurrentWeather.and.returnValue(of());

    // Act
    fixture.detectChanges(); // triggers ngOnInit()

    // Assert
    expect(component).toBeTruthy();
  });

  it('should get currentWeather and WeatherService', () => {
    // Arrange
    weatherServiceMock.getCurrentWeather.and.returnValue(of());

    // Act
    fixture.detectChanges(); // triggers ngOnInit()

    // Assert
    expect(weatherServiceMock.getCurrentWeather).toHaveBeenCalledTimes(1);
  });

  it('should eagerly load current weather in Nairobi from weatherService', () => {
    // Arrange
    weatherServiceMock.getCurrentWeather.and.returnValue(of(fakeWeather));
    // Act
    fixture.detectChanges(); // triggers ngOnInit()
    // Assert
    expect(component.current).toBeDefined();
    expect(component.current.city).toEqual('Nairobi');
    expect(component.current.temperature).toEqual(296.15);
    // Assert on DOM
    const debugEl = fixture.debugElement;
    const titleEl: HTMLElement = debugEl.query(By.css('span')).nativeElement;
    expect(titleEl.textContent).toContain('Nairobi');
  });
});
