export type SliderConfig = {
  sliderLength: number;
  daysBefore: number;
  daysAfter: number;
};

export const INITIAL_SLIDER_CONFIG: SliderConfig = {
  sliderLength: 7,
  daysBefore: -3,
  daysAfter: 3,
};

export const SMALL_SLIDER_CONFIG: SliderConfig = {
  sliderLength: 5,
  daysBefore: -2,
  daysAfter: 2,
};

export type SliderSizeOptions = 'full' | 'small';
