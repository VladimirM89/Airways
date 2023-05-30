import { Nullable } from 'src/app/shared/models/types';

export interface DateSliderItemDto {
  date: Date;
  price: Nullable<number>;
  available: boolean;
  active: boolean;
}

export interface DirectionsData {
  from: string;
  to: string;
}
