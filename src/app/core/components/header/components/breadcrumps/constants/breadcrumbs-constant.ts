import { BreadcrumbInterface } from '../../../../../../types/interfaces';
import { BreadcrumbsLabel, BreadcrumbsPaths } from './breadcrumbs-enum';

export const Breadcrumbs: BreadcrumbInterface[] = [
  {
    label: BreadcrumbsLabel.FLIGHTS,
    url: BreadcrumbsPaths.BOOKING_FLIGHTS,
    isDone: false,
    isActive: false,
  },
  {
    label: BreadcrumbsLabel.PASSENGERS,
    url: BreadcrumbsPaths.BOOKING_PASSENGERS,
    isDone: false,
    isActive: false,
  },
  {
    label: BreadcrumbsLabel.PAYMENT,
    url: BreadcrumbsPaths.BOOKING_PAYMENT,
    isDone: false,
    isActive: false,
  },
];
