import { useQuery } from "@tanstack/react-query";
import { getAvailableCabins } from "../../services/apiCabins";

export function useAvailableCabins(startDate, endDate) {
  return useQuery({
    queryKey: ["availableCabins", startDate, endDate],
    queryFn: () => getAvailableCabins(startDate, endDate),
    enabled: Boolean(startDate && endDate),
    placeholderData: [],
  });
}
