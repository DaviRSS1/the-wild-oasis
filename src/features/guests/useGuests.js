import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getGuests } from "../../services/apiGuests";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";
import { useEffect } from "react";

export function useGuests() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  //SORTING
  const sortByRaw = searchParams.get("sortBy") || "created_at-desc";
  const [field, direction] = sortByRaw.split("-");

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // QUERY
  const { isPending, data: { data: guests, count } = {} } = useQuery({
    queryKey: ["guests", page, sortByRaw],
    queryFn: () => getGuests({ page, sortBy: { field, direction } }),
  });

  const pageCount = count ? Math.ceil(count / PAGE_SIZE) : 0;

  // PRE-FETCHING
  useEffect(() => {
    if (!count) return;

    if (page < pageCount)
      queryClient.prefetchQuery({
        queryKey: ["guests", page + 1],
        queryFn: () => getGuests({ page: page + 1 }),
      });

    if (page > 1)
      queryClient.prefetchQuery({
        queryKey: ["guests", page - 1],
        queryFn: () => getGuests({ page: page - 1 }),
      });
  }, [page, pageCount, count, queryClient]);

  return { isPending, guests, count };
}
