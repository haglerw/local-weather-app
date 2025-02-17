import { Observable, of } from 'rxjs';

import { ICurrentWeather } from '../interfaces';
import { IWeatherService } from './weather.service';

export const fakeWeather: ICurrentWeather = {
  city: 'Nairobi',
  country: 'KE',
  date: 1485789600,
  image: '',
  temperature: 296.15,
  description: 'light intensity drizzle',
};

export class WeatherServiceFake implements IWeatherService {
  public getCurrentWeather(city: string, country: string): Observable<ICurrentWeather> {
    return of(fakeWeather);
  }
}
