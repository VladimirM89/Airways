import { Paths } from '../../../../../../types/enums';
import { BreadcrumbInterface } from '../../../../../../types/interfaces';
import { BreadcrumbsLabel } from './breadcrumbs-enum';

export const Breadcrumbs: BreadcrumbInterface[] = [
  {
    label: BreadcrumbsLabel.FLIGHTS,
    url: Paths.BOOKING_FLIGHTS,
    isDone: false,
    isActive: false,
  },
  {
    label: BreadcrumbsLabel.PASSENGERS,
    url: Paths.BOOKING_PASSENGERS,
    isDone: false,
    isActive: false,
  },
  {
    label: BreadcrumbsLabel.PAYMENT,
    url: Paths.BOOKING_PAYMENT,
    isDone: false,
    isActive: false,
  },
];
