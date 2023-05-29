import { Nullable } from 'src/app/shared/models/types';

export interface DateSliderItemDto {
  date: Date;
  price: Nullable<number>;
  available: boolean;
}
