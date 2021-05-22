/**
 *
 * Asynchronously loads the component for BookCard
 *
 */

import { lazyLoad } from 'utils/loadable';

export const BookCard = lazyLoad(
  () => import('./index'),
  module => module.BookCard,
);
