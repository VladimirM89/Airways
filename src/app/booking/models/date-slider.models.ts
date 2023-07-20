import { Nullable } from 'src/app/shared/models/types';

export interface DateSliderItem {
  date: Date;
  price: Nullable<number>;
}

export interface DirectionsData {
  from: string;
  to: string;
}
