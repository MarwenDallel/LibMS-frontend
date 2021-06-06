/**
 * Asynchronously loads the component for UserReservationsPage
 */

import { lazyLoad } from 'utils/loadable';

export const UserReservationsPage = lazyLoad(
  () => import('./index'),
  module => module.UserReservationsPage,
);
