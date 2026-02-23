import { differenceInDays, parseISO } from "date-fns";

export function useBookingPrice({
  startDate,
  endDate,
  cabin,
  numGuests,
  hasBreakfast,
  settings,
}) {
  const numNights =
    startDate && endDate
      ? differenceInDays(parseISO(endDate), parseISO(startDate))
      : 0;

  const cabinPrice =
    ((cabin?.regularPrice ?? 0) - (cabin?.discount ?? 0)) * (numNights ?? 0);

  const optionalBreakfastPrice =
    (settings?.breakfastPrice ?? 0) * (numGuests ?? 0) * (numNights ?? 0);

  const breakfastTotal = hasBreakfast ? optionalBreakfastPrice : 0;

  const totalPrice = cabinPrice + breakfastTotal;

  return {
    numNights,
    cabinPrice,
    optionalBreakfastPrice,
    breakfastTotal,
    totalPrice,
  };
}
