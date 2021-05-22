/**
 *
 * Asynchronously loads the component for BookCard
 *
 */

import { lazyLoad } from 'utils/loadable';

export const BookSearch = lazyLoad(
  () => import('./index'),
  module => module.BookSearch,
);
