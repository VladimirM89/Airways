import { BreadcrumbInterface } from '../../../../../../types/interfaces';
import { BreadcrumbsLabel, BreadcrumbsPaths } from './breadcrumbs-enum';

export const Breadcrumbs: BreadcrumbInterface[] = [
  {
    id: 1,
    label: BreadcrumbsLabel.FLIGHTS,
    url: BreadcrumbsPaths.BOOKING_FLIGHTS,
    isDone: false,
    isActive: false,
  },
  {
    id: 2,
    label: BreadcrumbsLabel.PASSENGERS,
    url: BreadcrumbsPaths.BOOKING_PASSENGERS,
    isDone: false,
    isActive: false,
  },
  {
    id: 3,
    label: BreadcrumbsLabel.PAYMENT,
    url: BreadcrumbsPaths.BOOKING_PAYMENT,
    isDone: false,
    isActive: false,
  },
];
