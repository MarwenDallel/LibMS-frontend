/**
 *
 * ReservationsPage
 *
 */
import { SectionHeading } from 'app/components/SectionHeading';
import * as React from 'react';
import { ReservationsList } from './ReservationsList';

export function ReservationsPage() {
  return (
    <>
      <SectionHeading title="Reservations"></SectionHeading>
      <ReservationsList />
    </>
  );
}
