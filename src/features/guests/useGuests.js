import { useQuery } from "@tanstack/react-query";
import { getGuests } from "../../services/apiGuests";

export function useGuests() {
  const { isPending: isPendingGuests, data: guests } = useQuery({
    queryKey: ["guests"],
    queryFn: getGuests,
  });
  return { isPendingGuests, guests };
}
